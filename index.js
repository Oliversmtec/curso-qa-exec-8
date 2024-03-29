import { assert } from "chai";
import { Builder, By, Key } from "selenium-webdriver"

async function toDolist(tasks) {
    //  abrir navegador
    let driver = await new Builder().forBrowser("chrome").build()

    // navegar atê o site 
    await driver.get("https://herziopinto.github.io/lista-de-tarefas/")



    for (const task of tasks) {
        // encontrar o imput e digitar uma nova tarefa- adicionar tarefa
        await driver.findElement(By.id("inputTask")).sendKeys(task, Key.RETURN)

        let index = tasks.indexOf(task)
        // Assertion - Verificação do texto da tarefa
        if (index == 0) {
            let elementText = await driver.findElement(By.xpath('/html/body/div/section/ul/li/label')).getText()
            .then(function (value) {
                return value
            }); 

            // Assertion utilizando Node puro - Vanilla Js
            assert.strictEqual(elementText, "Aprender Selenium")
            
        } else {
            let xpath = '/html/body/div/section/ul/li[' + (index + 1) + ']/label'
            let elementText  = await driver.findElement(By.xpath(xpath)).getText()
            .then(function (value) {
                return value
            }); 

            // Assertion utilizando Node puro - Vanilla Js
            assert.strictEqual(elementText, task)
        }
       
    }
    
    

    // Fechar navegador
    await driver.quit()
}

let tasks = [ "Aprender Selenium", "ser qa", "tomar cafe", "ir trabalhar", "viajar", "cypress", "scrum", "Jira", "GIT", "Html" ]

toDolist(tasks);