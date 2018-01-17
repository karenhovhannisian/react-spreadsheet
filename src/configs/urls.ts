const urls: any = {
    development: {
        hostname: "localhost",
        apiUrl: "http://5a57735a751d4e0012779696.mockapi.io/api/v1",
    },
    production: {
        hostname: "example.com",
        apiUrl: "http://5a57735a751d4e0012779696.mockapi.io/api/v1",
    },
    test: {
        hostname: "example.com",
        apiUrl: "http://5a57735a751d4e0012779696.mockapi.io/api/v1",
    },
};

export default urls[process.env.NODE_ENV || "development"];
