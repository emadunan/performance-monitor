const os = require("os");

function cpuAverage() {
  const cpus = os.cpus();
  let idleMs = 0;
  let totalMs = 0;

  cpus.forEach(core => {
    for (const node in core.times) {
      totalMs += core.times[node];
    }

    idleMs += core.times.idle;
  });

  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length
  }
}

function getCpuLoad() {
  return new Promise((resolve, _reject) => {
    const start = cpuAverage();
    setTimeout(() => {
      const end = cpuAverage();
      const idleDiff = end.idle - start.idle;
      const totalDiff = end.total - start.total;
      const percentOfCpu = 100 - Math.floor(100 * idleDiff / totalDiff);
      resolve(percentOfCpu);
    }, 100);
  })
}

function performanceLoadData() {
  return new Promise(async (resolve, reject) => {
    const osType = os.type();
    const upTime = os.uptime();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();

    const usedMem = totalMem - freeMem;
    const memUseage = Math.floor(usedMem / totalMem * 100) / 100;

    const cpus = os.cpus();
    const cpuType = cpus[0].model;
    const cpuSpeed = cpus[0].speed;
    const cpuCores = cpus.length;

    const cpuLoad = await getCpuLoad(cpus);

    resolve({
      freeMem,
      totalMem,
      usedMem,
      memUseage,
      osType,
      upTime,
      cpuType,
      cpuCores,
      cpuSpeed,
      cpuLoad,
    });
  });
}

const run = async () => {
  const data = await performanceLoadData();
  console.log(data);
}

run();
