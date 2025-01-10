interface Config {
  urls: {
    SERVER_URL: string;
  }
}

const prod: Config = {
    urls: {
      SERVER_URL: ""
    }
  };
  
  // Development urls
  const dev: Config = {
    urls: {
      SERVER_URL: 'http://127.0.0.1:3000/'
    }
  };
  
  export const config: Config = process.env.NODE_ENV === 'development' ? dev : prod;