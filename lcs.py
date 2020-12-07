import re

def removeComments(text):

    pattern = r"""
                            ##  --------- COMMENT ---------
           //.*?$           ##  Start of // .... comment
         |                  ##
           /\*              ##  Start of /* ... */ comment
           [^*]*\*+         ##  Non-* followed by 1-or-more *'s
           (                ##
             [^/*][^*]*\*+  ##
           )*               ##  0-or-more things which don't start with /
                            ##    but do end with '*'
           /                ##  End of /* ... */ comment
         |                  ##  -OR-  various things which aren't comments:
           (                ##
                            ##  ------ " ... " STRING ------
             "              ##  Start of " ... " string
             (              ##
               \\.          ##  Escaped char
             |              ##  -OR-
               [^"\\]       ##  Non "\ characters
             )*             ##
             "              ##  End of " ... " string
           |                ##  -OR-
                            ##
                            ##  ------ ' ... ' STRING ------
             '              ##  Start of ' ... ' string
             (              ##
               \\.          ##  Escaped char
             |              ##  -OR-
               [^'\\]       ##  Non '\ characters
             )*             ##
             '              ##  End of ' ... ' string
           |                ##  -OR-
                            ##
                            ##  ------ ANYTHING ELSE -------
             .              ##  Anything other char
             [^/"'\\]*      ##  Chars which doesn't start a comment, string
           )                ##    or escape
    """
    regex = re.compile(pattern, re.VERBOSE | re.MULTILINE | re.DOTALL)
    noncomments = [m.group(2) for m in regex.finditer(text) if m.group(2)]

    return "".join(noncomments)


def commentRemover(text):
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
    return (line1, maxcolom1, data1)


def longest_subsequence(info1,info2):
    line = 0.0
    pers12 = 0.0
    pers21 = 0.0
    container1 = 0
    (line1, maxcolom1, data1)=info1
    (line2, maxcolom2, data2)=info2
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

