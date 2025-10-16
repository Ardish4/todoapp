// Custom API Response class to standardize success responses
class ApiResponse {
  constructor(statusCode, message = "Success", data){
    this.statusCode = statusCode
    this.message = message
    this.data = data
  }
}

export default ApiResponse
