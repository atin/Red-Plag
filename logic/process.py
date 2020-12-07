from  lcs import longest_subsequence, readfile
import os
import matplotlib.pyplot as plt
import numpy as np
import shutil


def start():
    """
    The function start() iterates through all files in the ../UPLOADS directory and generates bar graphs for each file 
    The graphs are stored as .png files in ../RESULTS directory
    Key Variables:
        filenames[] : lists all the files in the UPLOADS directory
        sim[] : Similarity percentage matrix
                sim[i][j] = percentage content of file[i] likely copied from file[j]
    """
    path = '../UPLOADS'

    path2 = '../RESULTS'
    if not os.path.exists(path2):
        os.makedirs(path2)
    else:
        shutil.rmtree(path2)           # Removes all the subdirectories
        os.makedirs(path2)

    
    filenames = []      
    files = []
    
    sim = []            
    # r=root, d=directories, f = files
    for r, d, f in os.walk(path):
        for file in f:
            files.append(os.path.join(r, file))
            filenames.append(file)
    info = []
    for file in files:
        info.append(readfile(file))

    for i in range(len(files)):
        temp = []
        for j in range(len(files)):
            if(i!=j):
                res = longest_subsequence(info[i],info[j])
                temp.append(res)
            else:
                temp.append(100)
        
        sim=sim+[temp]          
        fig, ax=plt.subplots()
        ax.bar(filenames, temp)
        ax.set_ylabel('Percentage Similarity')
        ax.set_xticks(np.arange(len(filenames)))
        ax.set_xticklabels(1+np.arange(len(filenames)))
        ax.set_title(filenames[i])
        plt.savefig('../RESULTS/'+filenames[i]+'.png')

start()
