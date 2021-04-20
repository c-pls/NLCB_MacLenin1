from bs4 import BeautifulSoup
import json
import pprint
with open('./TRẮC NGHIỆM BÀI 12.html') as fp:
    soup = BeautifulSoup(fp, 'html.parser')


def scrape(soup):

    questions = soup.select('.freebirdFormviewerComponentsQuestionBaseHeader')
    #questions = soup.select('.freebirdFormviewerViewItemsItemItemTitle')
    answers = soup.select('.docssharedWizToggleLabeledPrimaryText')
    print(questions[3].getText())
    print(len(questions))
    print(len(answers))
    form = []
    for i in range(3, 21):
        form.append( {"question": questions[i].getText(),
                       "answer1": answers[(i - 3) * 4].getText(),
                      "answer2": answers[(i - 3) * 4 + 1].getText(),
                       "answer3": answers[(i - 3) * 4 + 2].getText(),
                    "answer4": answers[(i - 3) * 4 + 3].getText(),
                    "correct": ""})
    return form


if __name__ == "__main__":
    form = scrape(soup)
    with open("./raw_data_set12.json", 'w') as file:
        json.dump(form, file)
    pprint.pprint(form)
