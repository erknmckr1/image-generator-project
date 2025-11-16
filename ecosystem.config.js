module.exports = {
  apps: [
    {
      name: "image-generator",
      script: "cmd.exe",
      args: ["/c", "npm run dev -- --hostname 172.17.160.1 --port 3000"],
      cwd: "C:\\Users\\ecakir\\OneDrive - Midas Hediyelik Esya San. ve Tic. A.S\\Desktop\\image-generator-project",
      env: {
        NODE_ENV: "development"
      }
    }
  ]
};
