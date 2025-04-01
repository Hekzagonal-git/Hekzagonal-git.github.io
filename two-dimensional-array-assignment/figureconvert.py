'''the previous figures with 3x3s'''
FIGURES = [
        [[11, 12, 13, 14], [7, 12, 17, 22], [10, 11, 12, 13], [2, 7, 12, 17]],
        [[0, 3, 4, 5], [1, 2, 4, 7], [3, 4, 5, 8], [1, 4, 6, 7]],
        [[2, 3, 4, 5], [1, 4, 7, 8], [3, 4, 5, 6], [0, 1, 4, 7]],
        [[1, 2, 4, 5], [4, 5, 7, 8], [3, 4, 6, 7], [0, 1, 3, 4]],
        [[1, 2, 3, 4], [1, 4, 5, 8], [4, 5, 6, 7], [0, 3, 4, 7]],
        [[1, 3, 4, 5], [1, 4, 5, 7], [3, 4, 5, 7], [1, 3, 4, 7]],
        [[0, 1, 4, 5], [2, 4, 5, 7], [3, 4, 7, 8], [1, 3, 4, 6]]
]

'''the now converted figures into exclusively 5x5s'''
TEST = [
    [[11, 12, 13, 14], [7, 12, 17, 22], [10, 11, 12, 13], [2, 7, 12, 17]],
    [[0, 5, 6, 7], [1, 2, 6, 11], [5, 6, 7, 12], [1, 6, 10, 11]],
    [[2, 5, 6, 7], [1, 6, 11, 12], [5, 6, 7, 10], [0, 1, 6, 11]],
    [[1, 2, 6, 7], [6, 7, 11, 12], [5, 6, 10, 11], [0, 1, 5, 6]],
    [[1, 2, 5, 6], [1, 6, 7, 12], [6, 7, 10, 11], [0, 5, 6, 11]],
    [[1, 5, 6, 7], [1, 6, 7, 11], [5, 6, 7, 11], [1, 5, 6, 11]],
    [[0, 1, 6, 7], [2, 6, 7, 11], [5, 6, 11, 12], [1, 5, 6, 10]]
]

''' 3x3 grid vs 5x5 grid
0 1 2
3 4 5
6 7 8

00 01 02 03 04
05 06 07 08 09
10 11 12 13 14
15 16 17 18 19
20 21 22 23 24
'''

def convert_three_to_five():
    new_figures = []
    for mino in range(len(FIGURES)):
        new_figures.append([])
        for rotation in range(len(FIGURES[mino])):
            new_figures[mino].append([])
            for value in range(len(FIGURES[mino][rotation])):
                current = FIGURES[mino][rotation][value]
                new_figures[mino][rotation][value] = current
                if current > 2:
                    new_figures[mino][rotation][value] += 2
                if current > 5:
                    new_figures[mino][rotation][value] += 2

    print(new_figures)

'''outputs the thing below'''
[

    [[15, 16, 17, 18], [11, 16, 21, 26], [14, 15, 16, 17], [2, 11, 16, 21]],
    [[0, 5, 6, 7], [1, 2, 6, 11], [5, 6, 7, 12], [1, 6, 10, 11]],
    [[2, 5, 6, 7], [1, 6, 11, 12], [5, 6, 7, 10], [0, 1, 6, 11]],
    [[1, 2, 6, 7], [6, 7, 11, 12], [5, 6, 10, 11], [0, 1, 5, 6]],
    [[1, 2, 5, 6], [1, 6, 7, 12], [6, 7, 10, 11], [0, 5, 6, 11]],
    [[1, 5, 6, 7], [1, 6, 7, 11], [5, 6, 7, 11], [1, 5, 6, 11]],
    [[0, 1, 6, 7], [2, 6, 7, 11], [5, 6, 11, 12], [1, 5, 6, 10]]
]

def print_figures_five_by_five(array):
    for i in range(len(array)):
        '''tetromino'''
        for j in range(len(array[i])):
            '''rotation'''
            for i1 in range(5):
                new_row = []
                for j1 in range(5):
                    if 5 * i1 + j1 in array[i][j]:
                        new_row.append(1)
                    else:
                        new_row.append(0)
                print(new_row)
            print(0)
        print(00)
