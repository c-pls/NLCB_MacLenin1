from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

from bs4 import BeautifulSoup
import requests
import pprint
import json
"""
Simplt using Selenium to login into google account and get the data in the Google Form
"""
driver = webdriver.Chrome('./chromedriver')

url_link = 'YourURL'


def login(driver):
    driver.get(r'https://accounts.google.com/signin/v2/identifier?continue='+\
    'https%3A%2F%2Fmail.google.com%2Fmail%2F&service=mail&sacu=1&rip=1'+\
    '&flowName=GlifWebSignIn&flowEntry = ServiceLogin')
    driver.implicitly_wait(15)

    loginBox = driver.find_element_by_xpath('//*[@id ="identifierId"]')
    loginBox.send_keys("*******************")

    nextButton = driver.find_elements_by_xpath('//*[@id ="identifierNext"]')
    nextButton[0].click()

    passWordBox = driver.find_element_by_xpath(
        '//*[@id ="password"]/div[1]/div / div[1]/input')
    passWordBox.send_keys("******************************")

    nextButton = driver.find_elements_by_xpath('//*[@id ="passwordNext"]')
    nextButton[0].click()

    print('Login Successful...!!')


def scrape(driver):
    login(driver)
    driver.get(url_link)
    timeout = 20
    try:
        element_present = EC.presence_of_element_located((By.CLASS_NAME, 'freebirdFormviewerViewItemsItemItemHeader'))
        WebDriverWait(driver, timeout).until(element_present)
        res = requests.get(url_link)
        soup = BeautifulSoup(res.text, 'html.parser')
        form = []
        questions = soup.select('.freebirdFormviewerViewItemsItemItemHeader')
        answers = soup.select('.docssharedWizToggleLabeledPrimaryText')
        print(len(questions))
        for i in range(2, len(questions)):
            form.append( {"question": questions[i].getText()[3:],
                           "answer1": answers[(i - 2) * 4].getText(),
                          "answer2": answers[(i - 2) * 4 + 1].getText(),
                          "answer3": answers[(i - 2) * 4 + 2].getText(),
                        "answer4": answers[(i - 2) * 4 + 3].getText(),
                        "correct": answers[(i - 2) * 4 + 4].getText()})

    except TimeoutException:
        print("Timed out waiting for page to load")
        return form


if __name__ == '__main__':
    form = scrape(driver)
    with open(r'/home/cp/Downloads/maclenin/data.json', 'w') as file:
        json.dump(form, file)
    pprint.pprint(form)
