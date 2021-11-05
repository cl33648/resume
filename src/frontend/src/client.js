import fetch from 'unfetch'

const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    console.log(response);
    // convert non-2xx HTTP responses into errors:
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

export const getAllComments = () =>
    fetch("api/v1/comments")    //Promise object fetched
        .then(checkStatus);

export const getAllWorkExperiences = () =>
    fetch("api/v1/work")
        .then(checkStatus);

export const addNewWorkExperience = work =>
    fetch("api/v1/work", {
        headers: {
            "Content-Type":"application/json"},
        method: "POST",
        body: JSON.stringify(work)
    }).then(checkStatus);

export const deleteWorkExperience = workId =>
    fetch(`api/v1/work/${workId}`,{
        method: "DELETE"
    }).then(checkStatus);

export const getAllAcademicExperiences = () =>
    fetch("api/v1/academic")
        .then(checkStatus);

export const addNewAcademicExperience = academic =>
    fetch("api/v1/academic", {
        headers: {
            "Content-Type":"application/json"},
        method: "POST",
        body: JSON.stringify(academic)
    }).then(checkStatus);

export const deleteAcademicExperience = academicId =>
    fetch(`api/v1/academic/${academicId}`,{
        method: "DELETE"
    }).then(checkStatus);

export const getAllEducations = () =>
    fetch("api/v1/education")
        .then(checkStatus);

export const addNewEducation = education =>
    fetch("api/v1/education", {
        headers: {
            "Content-Type":"application/json"},
        method: "POST",
        body: JSON.stringify(education)
    }).then(checkStatus);

export const deleteEducation = educationId =>
    fetch(`api/v1/education/${educationId}`,{
        method: "DELETE"
    }).then(checkStatus);