import re

def commentRemover(text):
    """
    The function commentRemover(text) removes comments from C++ and Java sourcecode files
    Args:
        sourcecode file as text string
    Returns:
        uncommented file
    """
    def replacer(match):
        s = match.group(0)
        if s.startswith('/'):
            return " "  # note: a space and not an empty string
        else:
            return s
    pattern = re.compile(
        r'//.*?$|/\*.*?\*/|\'(?:\\.|[^\\\'])*\'|"(?:\\.|[^\\"])*"',
        re.DOTALL | re.MULTILINE
    )
    return re.sub(pattern, replacer, text)


def readfile(filename):
    """
        The function readfile(filename) reads a sourcecode file character wise and generates matrix representation of the file
        Args:
            filename: relative path of file to read
        Variables:
            line1: #lines in file
            data1: character matrix representation of file
        Returns:
            tuple(line1, data1)
    """
    uncmtFile = ""
    with open(filename) as f:
        uncmtFile = commentRemover(f.read())
        line1 = 0
        maxcolom1 = 0
        maxstring = 0
        for line in uncmtFile.split('\n'):
            line1 += 1
            maxstring += len(line)
            maxcolom1 = max(maxstring, maxcolom1)

        data1 = ['']*line1

        for i in range(line1):
            data1[i] = ['']*maxcolom1

        idx = 0
        for line in uncmtFile.split('\n'):
            data1[idx][:] = line
            idx += 1
    f.close()
    return (line1, data1)


def longest_subsequence(info1, info2):
    """
        This function longest_subsequence(info1, info2) finds length of longest common subsequence between two files
        Args:
            info1:  return value of readfile for file1
            info2:  return value of readfile for file2
        Key Variables:
            pers12: percentage content of file1 likely copied from file2
        Returns:
            the percentage content of file1 likely copied from file2 
    """
    line = 0.0
    pers12 = 0.0
    container1 = 0
    (line1, data1) = info1
    (line2, data2) = info2
    for i in range(line1):
        container1 += len(data1[i])
        container1 += 1

    container2 = 0
    for i in range(line2):
        container2 += len(data2[i])
        container2 += 1

    indexhelp = 0
    matrix1 = ['']*container1
    for i in range(line1):
        for y in range(len(data1[i])):
            matrix1[indexhelp] = data1[i][y]
            indexhelp += 1
        matrix1[indexhelp] = '\n'
        indexhelp += 1

    indexhelp = 0
    matrix2 = ['']*container2
    for i in range(line2):
        for y in range(len(data2[i])):
            matrix2[indexhelp] = data2[i][y]
            indexhelp += 1
        matrix2[indexhelp] = '\n'
        indexhelp += 1

    matrix = ['']*(container1+1)
    for i in range(container1+1):
        matrix[i] = ['']*(container2+1)

    for i in range(container1+1):
        for j in range(container2+1):
            if(i == 0 or j == 0):
                matrix[i][j] = 0
            elif(matrix1[i-1] == matrix2[j-1]):
                matrix[i][j] = 1+matrix[i-1][j-1]
            else:
                matrix[i][j] = max(matrix[i - 1][j], matrix[i][j - 1])

    idx = matrix[container1][container2]

    lcs = ['']*max(container1, container2)
    lcs[idx] = '\0'

    while (container1 > 0 and container2 > 0):

        if (matrix1[container1 - 1] == matrix2[container2 - 1]):
            lcs[idx - 1] = matrix1[container1 - 1]
            line += 1
            container1 -= 1
            container2 -= 1
            idx -= 1
        elif (matrix[container1 - 1][container2] > matrix[container1][container2 - 1]):
            container1 -= 1
        else:
            container2 -= 1

    pers12 = (line/len(matrix1))*100
    return pers12
