import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

export default {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  createDocument(data) {
    return service
      .post("/api/documents", data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getDocuments() {
    return service
      .get("/api/documents")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getPatientDocuments(patientId) {
    return (
      service
        ///api/patient/${patientId}
        .get("/api/patient/" + patientId + "/documents")
        .then((res) => res.data)
        .catch(errorHandler)
    );
  },

  getOneDocument(id) {
    return service
      .get(`/api/documents/${id}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  updateDocument(id, data) {
    return service
      .patch(`api/documents/${id}`, data)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  removeDocument(documentId) {
    return service
      .delete(`/api/documents/${documentId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getPatients() {
    return service
      .get("/api/patient")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  addNewPatient(patientId) {
    return service
      .patch("/api/users/me/patient", { id: patientId })
      .catch(errorHandler);
  },

  getMyPatients() {
    return service
      .get("/api/users/me/patient")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getPatientProfile(patientId) {
    return service
      .get(`/api/patient/${patientId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};
