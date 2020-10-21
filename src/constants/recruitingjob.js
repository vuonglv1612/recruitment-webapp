export const status_message_mapping = {
    422: "Thông tin nhập vào không hợp lệ",
    401: "Email hoặc mật khẩu không chính xác",
};


export const get_own_jobs_api = (employer_id) => {
    return "http://recruitment.api.pythonistavn.com/api/v1/employers/" + employer_id + "/jobs"
}
