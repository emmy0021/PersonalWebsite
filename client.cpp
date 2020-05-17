#include <stdio.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netdb.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <iostream>
#include "common.h"
#include "BoundedBuffer.h"
#include "Histogram.h"
#include "common.h"
#include "HistogramCollection.h"
#include "NRC.h"
using namespace std;


void * patient_function(BoundedBuffer* b,int n,int patient)
{
    /* What will the patient threads do? */

	for(int i =0;i<n;i++){
		datamsg* msg = new datamsg(patient,(i*.004),1);
		b->push((char*) msg,sizeof(datamsg));
	}
	//pthread_exit(NULL);
    
	
}

void * worker_function(BoundedBuffer* b, HistogramCollection* hc, NRC* chan, char* buf, char* sourceFile, __int64_t fileSize)///////////////edited///////////////////////////////////////////////////////
{
    /*
		Functionality of the worker threads	
    */
	while(true){
		vector<char> r = b->pop();
		
		if(r[0] == QUIT_MSG){
			//cout << "Deleting channel" << &chan << endl;
			chan->cwrite(r.data(),r.size());
			delete chan;
			break;
		}else if(r[0] == DATA_MSG){
			chan->cwrite(r.data(),r.size());
			datamsg* msg = (datamsg*) r.data();
			double* tp = (double*) chan->cread();
			
			hc->update(msg-> person, *tp);
		}else if(r[0] == FILE_MSG){
			filemsg* m = (filemsg*) r.data();
			memcpy(buf, (char*) m, m->length);
    		memcpy(buf + sizeof(filemsg), sourceFile, strlen(sourceFile));
			
			
			chan->cwrite((char*) buf, m->length);
			char* r = chan->cread(&m->length);
			
			FILE* targetFile = fopen(sourceFile,"rb+");
			fseek(targetFile, m->offset, SEEK_SET);
			
			int n = fwrite(r,1,m->length,targetFile);
			fclose(targetFile);
		}
		
		
		
	}
    
}
void * file_function(BoundedBuffer* b, char* buf, filemsg getFile, int bufSize, __int64_t fileSize){
	
			while(fileSize > 0){
			if(fileSize < bufSize){//for last part of file
				getFile.length = fileSize;
				memcpy(&buf,&getFile,sizeof(getFile));
			}
			
			b->push((char*) &getFile, sizeof(filemsg)); 
			
			getFile.offset += MAX_MESSAGE;
			fileSize -= MAX_MESSAGE;
			memcpy(&buf,&getFile,sizeof(getFile));
		}	

}

int main(int argc, char *argv[])
{
    int n = 100;    //default number of requests per "patient"
    int p = 10;     // number of patients [1,15]
    int w = 100;    //default number of worker threads
    int b = 20; 	// default capacity of the request buffer, you should change this default
	int m = MAX_MESSAGE; 	// default capacity of the file buffer
	char *f = "";
	string fileName;
    srand(time_t(NULL));
	bool requestFile = false;
	bool debug = true;

	string port = "";
	string hostName = "";
    
    int c;
    while((c=getopt(argc,argv,"n:p:w:b:f:h:r:")) != -1){
        switch(c){
			
			case 'n':
    			n = atoi(optarg);
    			break;
    		case 'p':
    			p = atoi(optarg);
    			break;
    		case 'w':
    			w = atoi(optarg);
    			break;
    		case 'b':
    			b = atoi(optarg);
    			break;
    		case 'f':
    			f = new char[strlen(optarg)];
    			strcpy(f,optarg);
				fileName = optarg;
				requestFile = true;
    			break;
			case 'h':
				hostName = optarg;
				break;
			case 'r':
				port = optarg;
				break;
			
		}
    }
	
	//cout << "p = " << patient << " t = " << time << " e = " << ecg << " f = " << fileName << " c = " << requestChannel << endl; //test input from getopt
	
	//Testing getopt
	if(debug){
		cout << "n: " << n << endl;
		cout << "p: " << p << endl;
		cout << "w: " << w << endl;
		cout << "b: " << b << endl;
		cout << "f: " << f << endl;
		cout << "hostName: " << hostName << endl;
		cout << "port: " << port << endl;
	}
	
	/////////////////
		NRC* chan = new NRC(hostName,port);

		cout << "this ran" << endl;
		BoundedBuffer request_buffer(b);
		
		struct timeval start, end;
		
		vector<thread> pThreads;
			
		vector<thread> wThreads;
		
		HistogramCollection hc;
		
		vector<NRC*> wChannels;
		
		if(requestFile){/////file request///////////////////////////////////////////////////////
			if(debug){	
				cout << "Running File request mode" << endl;
			}
			
			
			int fd= creat(f,S_IRWXU);
			
			int fileSZ = (sizeof(filemsg)+fileName.length()+1);
			char* buf = new char[fileSZ];
			char buf2[fileSZ];
			

			filemsg getFile = filemsg(0,0); 
			
			memcpy(&buf2,&getFile,sizeof(getFile));//copy filemsg to buffer
		
			strcpy(buf2+sizeof(getFile),fileName.c_str());
			
			memcpy(buf, &getFile, sizeof(getFile));
			strcpy(buf+sizeof(getFile),fileName.c_str());
			//memcpy(buf + sizeof(filemsg), f, strlen(f));

			
			chan->cwrite(buf2,sizeof(buf2));
			
			__int64_t size = *((__int64_t*) chan->cread());
			cout << "sent request, size:" << size << endl;
			
			getFile.length = m;
			cout << getFile.length << endl;
			
			memcpy(&buf,&getFile,sizeof(getFile));
			
			
			for(int i =0;i<w;i++){
				NRC* channel = new NRC(hostName,port);
				wChannels.push_back(channel);
			}
			if(debug){	
				cout << "worker channels created" << endl;
			}
			
			
			
			gettimeofday (&start, 0);
			thread fileR(file_function,&request_buffer,buf,getFile, m, size);
			for(int i =0;i<w;i++){
				wThreads.push_back(thread(worker_function,&request_buffer,&hc,wChannels[i],buf,f,fileSZ));
			}
			if(debug){	
				cout << "worker threads made" << endl;
			}
			
			for(int i =0;i<w;i++){
				MESSAGE_TYPE quit = QUIT_MSG;
				
				request_buffer.push((char*) &quit,sizeof(MESSAGE_TYPE));
			}
			
			if(debug){	
				cout << "quit messages made" << endl;
			}
			
			fileR.join();
			for(int i =0;i<w;i++){
				wThreads[i].join();
				//pthread_join(workers[i],NULL);
			}
			if(debug){	
				cout << "worker threads joined" << endl;
			}
			gettimeofday (&end, 0);
			
			delete buf;
		}else{
				//////////////Datapoints////////////////////////////////////////////////////////
			
			if(debug){	
				cout << "Running Data point mode" << endl;
			}
			
			
			
			//Histogram Initilization
			
			for(int i =0;i<p;i++){
				Histogram* hist = new Histogram(10,-2,2);
				hc.add(hist);
			}
			
			if(debug){
				cout << "Histograms created" << endl; 
			}
			
			
			
			
			//create worker channels
			for(int i =0;i<w;i++){
				NRC* channel = new NRC(hostName,port);///////////////edited///////////////////////////////////////////////////////
				wChannels.push_back(channel);
			}
			if(debug){	
				cout << "worker channels created" << endl;
			}
			
			gettimeofday (&start, 0);

			/* Start all threads here */
			for(int i =1;i<=p;i++){
				pThreads.push_back(thread(patient_function,&request_buffer,n,i));
			}
			if(debug){	
				cout << "patient threads made" << endl;
			}
			
			char buf;
			for(int i =0;i<w;i++){
				wThreads.push_back(thread(worker_function,&request_buffer,&hc,wChannels[i],&buf,f,0));
			}
			if(debug){	
				cout << "worker threads made" << endl;
			}

			/* Join all threads here */
			for(int i =0;i<p;i++){
				//pthread_join(patients[i],NULL);
				pThreads[i].join();
			}
			if(debug){	
				cout << " patient threads joined"<< endl;
			}
			
			for(int i =0;i<w;i++){
				MESSAGE_TYPE quit = QUIT_MSG;
				
				request_buffer.push((char*) &quit,sizeof(MESSAGE_TYPE));
			}
			
			if(debug){	
				cout << "quit messages made" << endl;
			}
			
			for(int i =0;i<w;i++){
				wThreads[i].join();
				//pthread_join(workers[i],NULL);
			}
			if(debug){	
				cout << "worker threads joined" << endl;
			}
			
			gettimeofday (&end, 0);
			system("clear");
			hc.print ();
		
		}
		
		int secs = (end.tv_sec * 1e6 + end.tv_usec - start.tv_sec * 1e6 - start.tv_usec)/(int) 1e6;
		int usecs = (int)(end.tv_sec * 1e6 + end.tv_usec - start.tv_sec * 1e6 - start.tv_usec)%((int) 1e6);
		cout << "Took " << secs << " seconds and " << usecs << " micor seconds" << endl;
		
		MESSAGE_TYPE q = QUIT_MSG;
		chan->cwrite ((char *) &q, sizeof (MESSAGE_TYPE));
		cout << "All Done!!!" << endl;
		delete chan;
	
}
