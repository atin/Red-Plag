from lcs import longest_subsequence, readfile
import os

path = '.\\UPLOADS'

filenames = []
files = []
sim = []
# r=root, d=directories, f = files
for r, d, f in os.walk(path):
    for file in f:
        files.append(os.path.join(r, file))
        filenames.append(f)
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

#sim[i][j] = percentage of file[i] likeli copied from file[j]

print(sim)

