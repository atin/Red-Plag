from lcs import longest_subsequence, readfile
import matplotlib.pyplot as plt
import numpy as np
import shutil
from os.path import dirname, abspath
import zipfile
import os

def zipdir(path, ziph):
    for root, dirs, files in os.walk(path):
        for file in files:
                ziph.write(os.path.join(root, file))

def zipify(path1, path2):
    zipf = zipfile.ZipFile(path1+'\\Results.zip', 'w', zipfile.ZIP_DEFLATED)
    zipdir(path2, zipf)
    zipf.close()

def start():
    """
    The function start() iterates through all files in the ../UPLOADS directory and generates bar graphs for each file 
    The graphs are stored as .png files in ../RESULTS directory
    Key Variables:
        filenames[] : lists all the files in the UPLOADS directory
        sim[] : Similarity percentage matrix
                sim[i][j] = percentage content of file[i] likely copied from file[j]
    """

    dir_name = dirname(dirname(abspath(__file__))) + '\\MEDIA'
    extension = ".zip"
    if os.path.exists(dir_name+'\\Results.zip'):
        os.remove(dir_name+'\\Results.zip')

    os.chdir(dir_name)  # change directory from working dir to dir with files

    for item in os.listdir(dir_name):  # loop through items in dir
        if item.endswith(extension):  # check for ".zip" extension
            file_name = os.path.abspath(item)  # get full path of files
            zip_ref = zipfile.ZipFile(file_name)  # create zipfile object
            zip_ref.extractall(dir_name)  # extract file to dir
            zip_ref.close()  # close file
            os.remove(file_name)  # delete zipped file

    path2 = dirname(dirname(abspath(__file__))) + '\\RESULTS'


    if not os.path.exists(path2):
        os.makedirs(path2)
    else:
        shutil.rmtree(path2)           # Removes all the subdirectories
        os.makedirs(path2)

    filenames = []
    files = []

    sim = []
    # r=root, d=directories, f = files
    for r, d, f in os.walk(dir_name):
        for file in f:
            files.append(os.path.join(r, file))
            filenames.append(file)
    info = []
    for file in files:
        info.append(readfile(file))

    for i in range(len(files)):
        temp = []
        for j in range(len(files)):
            if(i != j):
                res = longest_subsequence(info[i], info[j])
                temp.append(res)
            else:
                temp.append(100)

        sim = sim+[temp]
        fig, ax = plt.subplots()
        ax.bar(filenames, temp)
        ax.set_ylabel('Percentage Similarity')
        ax.set_xticks(np.arange(len(filenames)))
        ax.set_xticklabels(1+np.arange(len(filenames)))
        ax.set_title(filenames[i])
        plt.savefig('../RESULTS/'+filenames[i]+'.png')

    zipify(dir_name, path2)
start()
