namespace Projekt.DTO.Response
{
    public class ResponseObject
    {
        public Object? Data { get; set; }
        public string? ResponseMessage { get; set; }
        public int? StatusCode { get; set; }

        public ResponseObject()
        {

        }

        public ResponseObject(object responseObject, string responseMessage, int statusCode)
        {
            Data = responseObject;
            ResponseMessage = responseMessage;
            StatusCode = statusCode;
        }

        public object create(Object responseObject, string responseMessage, int statusCode)
        {
            return new ResponseObject { Data = responseObject, ResponseMessage = responseMessage, StatusCode = statusCode };
        }
        public object create(string responseMessage)
        {
            return new ResponseObject { ResponseMessage = responseMessage };
        }
        public object create(Object responseObject)
        {
            return new ResponseObject { Data = responseObject };
        }
    }
}
