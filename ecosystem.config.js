module.exports = {
  apps: [
    {
      name: "image-generator",
      script: "cmd.exe",
      args: ["/c", "npm run dev -- --hostname 192.168.0.77 --port 3000"],
      cwd: "C:\\Users\\ecakir\\OneDrive - Midas Hediyelik Esya San. ve Tic. A.S\\Desktop\\image-generator-project",
      env: {
        NODE_ENV: "development"
      }
    }
  ]
};
