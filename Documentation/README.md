# Red Plag Documentation

We are building a plagiarism detector website using Django.

## Instructions

1. Clone this repository - `git clone https://github.com/atin/Red-Plag.git`
2. Checkout to the `Final` branch - `git checkout Final`
3. Navigate to Red-Plag directory - `cd Red_Plag`
4. Install all required modules - `pip install -r requirements.txt`
5. Apply all migrations - `py manage.py migrate`
6. Run the server - `py manage.py runserver`

## Introduction

Red Plag is a web based rudimentary plagarism checker for C++ and Java sourcecode files. It is developed using `Django` backend and `HTML-CSS` frontend. It is enabled with user `sign-up` and `login` facilitated by `user-authentication`. The API has features like `file-upload`, `file-download` and `change-password`.

### The Algorithm

Longest Common Subsequence (LCS) is the principle algorithm used to compare similarity of two source code files. The following steps summarizes the process :

1. Comments are removed from each file using `commentRemover(text)`
2. Each file is represented as a matrix of characters using `readfile(file)`
3. Given matrix representation of two files, a intersection matrix of them is created representing characters of `file-1` along rows and that of `file-2` along columns
4. The common sub-strings lie along diagonals of square matrixes
5. `LCS` uses this property to find maximum contiguous common sub-sequence of the two files

### The API

The `API` allows the following:

1. `sign-up` for users who are not registered to the system - `registerPage()` achieves the task
2. `login` for registered users based on `authentication` - `loginPage()` does this
3. `file-upload` for logged-in users - `uploadfile()` does the task
4. `run-algorithm` for logged-in users - `initiate()` achieves the task
5. `results-download` for looged-in users - `filedownload()` does the task
6. `change-password` for logged-in users - `pass_change()` does the task

