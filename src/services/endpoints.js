
const BASE_URL = 'https://mb6c1nzt7b.execute-api.ap-south-1.amazonaws.com/dev/'
const DEV_BASE_URL = "https://mb6c1nzt7b.execute-api.ap-south-1.amazonaws.com/dev/"
const STAGE_BASE_URL = "https://q2envo9tlg.execute-api.ap-south-1.amazonaws.com/staging/"

export const endpoints = {
    getProjects : "https://mb6c1nzt7b.execute-api.ap-south-1.amazonaws.com/dev/projects",
    getDevice : "https://mb6c1nzt7b.execute-api.ap-south-1.amazonaws.com/dev/v2/project" ,
    getDeviceDetails : "https://mb6c1nzt7b.execute-api.ap-south-1.amazonaws.com/dev/v2/project" ,
    sendDeviceToken : "https://q2envo9tlg.execute-api.ap-south-1.amazonaws.com/staging/user/loginDetails",
    // getAlerts : "https://mb6c1nzt7b.execute-api.ap-south-1.amazonaws.com/dev/v2/alerts?deviceId=6wqRa&start_time=2022-10-19T14:44:20&end_time=2022-10-20T14:44:20"
    getAlerts : "https://mb6c1nzt7b.execute-api.ap-south-1.amazonaws.com/dev/v2/alerts",
    // getEvents : "https://mb6c1nzt7b.execute-api.ap-south-1.amazonaws.com/dev/project/SIFJB/device/8LUlj/event?start_time=2022-10-20T10:43:18&end_time=2022-10-21T10:43:18" ,
    // alertsNumber : 'https://mb6c1nzt7b.execute-api.ap-south-1.amazonaws.com/dev/getAlertWarningCount?start_time=2022-01-22T01:00:47Z&end_time=2022-08-22T01:10:47Z&projectId=SIFJB',
    alertsNumber : 'https://mb6c1nzt7b.execute-api.ap-south-1.amazonaws.com/dev/getAlertWarningCount',
    getEvents : "https://mb6c1nzt7b.execute-api.ap-south-1.amazonaws.com/dev/project/" ,
    // getAlertsByProject : "https://mb6c1nzt7b.execute-api.ap-south-1.amazonaws.com/dev/v2/alerts?projectId=SIFJB&start_time=2022-11-01T17:19:41&end_time=2022-11-02T17:19:41"
    getAlertsByProject : "https://mb6c1nzt7b.execute-api.ap-south-1.amazonaws.com/dev/v2/alerts?"

}

// export const endpoints = {
//     getProjects : STAGE_BASE_URL + "projects",
//     getDevice : STAGE_BASE_URL + "v2/project" ,
//     getDeviceDetails : STAGE_BASE_URL + "v2/project" ,
//     sendDeviceToken : STAGE_BASE_URL + "user/loginDetails"
// }