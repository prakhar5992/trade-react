const exp = require('express');
const apps = exp();
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const session = require('express-session');
const bodyParser = require('body-parser');
apps.use(cors());
apps.use(bodyParser.urlencoded({extended:true}));
apps.use(bodyParser.json());
apps.listen(5001);
apps.post('/closeTask/:taskid',(req,res)=>{
    var result = '';
    var taskid = 5749 ; //replace with ur task id
    var status = 'Pending';
    var username = 'msharma.fid@t3027'//functional id usernameaa
    var password = 'B6a06qwV1+I1Z8HB0x6KfIZa6N0+J0AzjU1jRXsc'//functional id
    var jsonString = '{"status" : "Approve"}';//replace your task data in json string
    axios.put('https://bawdemoap.bpm.ibmcloud.com/baw/dev/rest/bpm/wle/v1/task/'+taskid+'?action=finish&parts=all&&params= '+jsonString,{},
    {headers: {
        'Authorization': 'Basic '+ new Buffer.from(username + ':' + password).toString('base64'), 
    }} 
    )
    .then(response => {
                    console.log("Task Closed " + JSON.stringify(response.data).toString());
                    result ='Task ' + taskid + ' is completed successfully.';
                    status = 'Completed';
                    // res.render('taskFinished',{data:{taskid:taskid, statuscode : status , statusDescription : result}});
                    res.send("Operation successfull");
                })
    .catch(err => {
                    status = 'Error';
                    console.log("Error Occured Closed Task" + err);
                    result ='Unable to close the Task : ' + taskid + '. Task may be alreay closed, please contact administrator for further details.'; 
                    // res.render('taskFinished',{data:{taskid:taskid,statuscode : status , statusDescription : result}});
                    res.send("Operation Fail");
    });
});