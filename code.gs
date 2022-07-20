const AUTHOR_ID = "497d1667-d0e0-4748-9dcf-612d74a282ea"
const SCRIPT_NAME = "quest poison";
const HEADERS = {
  "x-client" : AUTHOR_ID + " - " + SCRIPT_NAME,
  "x-api-user" : USER_ID,
  "x-api-key" : API_TOKEN,
}

const questPoisonHabit = {"name":"Quest Poison","alias" : "questPoison", "notes": "*quest givers are impatient and have poisned you to work faster. so dont die!*"};
const lateTaskHabit = {"name" : "late task / lost item", "alias" : "lateTask"};

var paramsTemplatePost = {
  "method" : "post",
  "contentType": "application/json",
  "headers" : HEADERS,
  "encoding":false,
  "muteHttpExceptions": true,
}


var paramsTemplateGet = {
  "method" : "get",
  "contentType": "application/json",
  "headers" : HEADERS,
  "encoding":false,
  "muteHttpExceptions": true,
}
function setupHabits() {
    createHabit(questPoisonHabit)
    createHabit(lateTaskHabit);  
}


function createHabit(obj) {
     
     var postParams =  paramsTemplatePost;

      postParams["payload"] = Utilities.newBlob(JSON.stringify({
        "text" : obj.name,
        "alias" : obj.alias,
         "notes": obj,notes,
        "type" : "habit",
        "up" : false,
        "down" : true

      }));
      response = UrlFetchApp.fetch(
        "https://habitica.com/api/v3/tasks/user",postParams
        
      );
      if (response.getResponseCode() === 201) {
        Logger.log("Habit created successfully");
        response = JSON.parse(response.getContentText());
        return response.data["_id"];
      } else {
        Logger.log(response.getContentText())
      }
}


function scoreHabit(id) {
      const postParams = {
        method: "post",
        headers: {
          "x-api-user": USER_ID,
          "x-api-key": API_TOKEN,
        },
      };
      Logger.log("Scoring the habit...");
      response = UrlFetchApp.fetch(
        `https://habitica.com/api/v3/tasks/${id}/score/down`,
        postParams
      );
      if (response.getResponseCode() === 200) {
        Logger.log("Scoring successful");
      } else {
        Logger.log(
          "There was an issue scoring the habit: " + response.getContentText()
        );
      }
    }

    function overDueTodos()
{
    let today = new Date();
     today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
     Logger.log("today: " +  today);
      let days;
      let task;
      let soonToDoDate;
      let numOfTasks = 0;
      let d = UrlFetchApp.fetch(
        "https://habitica.com/api/v3/tasks/user?type=todos",
        paramsTemplateGet
      );
      let parsedD = JSON.parse(d.getContentText());
      function toDoin14Days(task) {
        if(task.date){
          let TaskDate = new Date(task.date);
           TaskDate = new Date(
          TaskDate.getFullYear(),
          TaskDate.getMonth(),
          TaskDate.getDate() + 1
        );
        
          if (TaskDate != today && TaskDate < today){
            Logger.log(TaskDate);
            numOfTasks += 1;
          }
        }
      }
      let overDueTodosv = parsedD.data.some(toDoin14Days);
      return numOfTasks;   
  }

function cronTasks(){
  var randomElemenet = Math.random()*100;
    Logger.log("rand num: " + randomElemenet); 
  if (randomElemenet < 25) {
   // do nothing got lucky
    scoreHabit(questPoisonHabit.alias);
  } else if(randomElement < 50 ) {
    scoreHabit(questPoisonHabit.alias);
  } else if(randomElement < 90) {
    scoreHabit(questPoisonHabit.alias);
    scoreHabit(questPoisonHabit.alias);
  } else {
    for (i = 0; i < 3; i++){
      scoreHabit(questPoisonHabit.alias);
    }
  }
 
``
    let numOfOverdue = overDueTodos();
    Logger.log("numOfOverdue: " + numOfOverdue);
    if(numOfOverdue > 0){
      scoreHabit(lateTaskHabit.alias);

    }
}
