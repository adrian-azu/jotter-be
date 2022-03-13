module.exports = {
  apps: [
    {
      name: 'npm',
      cwd: '/home/ec2-user/jotter-api/',
      script: 'npm',
      args: 'start',
      watch: true,
      env: {
        NODE_ENV: 'development',
        MONGO_DB:
          'mongodb+srv://restapi:McxThd6t4wrGLzhy@cluster0.kbtur.mongodb.net/jotter-api?retryWrites=true&w=majority',
        PORT: 3000,
        JWT_EXPIRATION: '1d',
        JWT_SECRET:
          'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYzOTMzMzQ0MSwiaWF0IjoxNjM5MzMzNDQxfQ.R5gYsItTgGgbzDwfuRoVGPoEatdct-kHh-kcumy_52c',
      },
    },
  ],
};
