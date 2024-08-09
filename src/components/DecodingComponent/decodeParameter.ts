// 解码 参数
export function getDecodeParamsaveAs(row: { dataContentStr: string; dataDir: number; frameIDStr: string; sigType: number }, protocolType: string) {
  // console.log('方向:', dataDirStr)
  var resultObj = {
    dataHexStr: row.dataContentStr.replace(/\s+/g, ''),
    factory: '',
    isDL: false,
    protocol: '',
    subLayer: ''
  }
  // 注：
  // 参数1、dataHexStr：页面传过来的 十六进制数值。
  // 参数2、factory： 目前除了 Abis信令需要传值： factory = 'NokiaSiemens', 其他为空字符串。
  // 参数3、isDL：  目前除了 A信令 默认为 false，其他类型需要根据 dataDir 判断 true / false。
  // 参数4、protocol： 每个信令传自己的关键字符：目前这里罗列了 4个类型的。
  // 参数5、subLayer:  只有C3数据 才有层类型，其他类型默认空字符串。

  // 1. PRI信令 PriSgn、PriSignal
  // 2. A信令   A、ASgn、ASignal
  // 3. Abis信令 Abis、AbisSgn、AbisSignal

  // Abis
  // 0: BTS  ->  BSC   上行
  // 1: BSC  ->  BTS   下行

  // PRI
  // 0: MSC   ->  RBC  下行 true
  // 1: RBC   ->  MSC  上行 false
  // 2: OBC   ->  RBC  上行 false
  // 3: RBC   ->  OBC  下行 true

  // I 接口 帧类型: AT命令、  CRC校验: CRC校验失败 (不需要解码)
  // 0: ATP -> MT   上行
  // 1: MT  ->  ATP  下行

  if (protocolType === 'PRI信令') {
    resultObj.protocol = 'PriSgn'
    // --上行： false  --下行： true
    if (row.dataDir == 0) {
      // 下行
      resultObj.isDL = true
    } else if (row.dataDir == 1) {
      // 上行
      resultObj.isDL = false
    } else if (row.dataDir == 2) {
      // 上行
      resultObj.isDL = false
    } else if (row.dataDir == 3) {
      // 下行
      resultObj.isDL = true
    }
  } else if (protocolType === 'A信令') {
    resultObj.protocol = 'A'
    // 无需上下行 默认: isDL = false
  } else if (protocolType === 'Abis信令') {
    resultObj.protocol = 'Abis'
    resultObj.factory = 'NokiaSiemens'
    // --上行： false  0：BTS->BSC
    // --下行： true  1：BSC->BTS
    if (row.dataDir == 0) {
      // 上行
      resultObj.isDL = false
    } else if (row.dataDir == 1) {
      // 下行
      resultObj.isDL = true
    }
  } else if (protocolType === 'C3数据') {

    if (row.frameIDStr == 'AT命令') {
      resultObj.subLayer = ''
    } else if (row.frameIDStr == 'HDLC') {
      resultObj.subLayer = 'HDLC'
    } else if (row.frameIDStr == 'NPDU') {
      resultObj.subLayer = 'NPDU'
    } else if (row.frameIDStr == 'TPDU') {
      resultObj.subLayer = 'TPDU'
    } else if (row.frameIDStr == 'TSDU') {
      resultObj.subLayer = 'TSDU'
    } else if (row.frameIDStr == 'SaPDU') {
      resultObj.subLayer = 'SaPDU'
    } else if (row.frameIDStr == 'APDU') {
      resultObj.subLayer = 'APDU'
    }

    // 方向
    if (row.dataDir == 0) {
      // 上行
      resultObj.isDL = false
    } else if (row.dataDir == 1) {
      // 下行
      resultObj.isDL = true
    }
    resultObj.protocol = 'C3'
  } else if (protocolType === 'L网SGi接口C3数据') { 
    // 信令类型 sigType
    // 1: IP + TCP
    // 2: ALE
    // 3: SaPDU
    // 4: APDU
    // 255: 未知或解析失败的数据相同记录时间的根据该字段由小到大排序
    if (row.sigType == 1) {
      resultObj.subLayer = 'IP'
    } else if (row.sigType == 2) {
      resultObj.subLayer = 'ALE'
    } else if (row.sigType == 3) {
      resultObj.subLayer = 'SaPDU'
    } else if (row.sigType == 4) {
      resultObj.subLayer = 'APDU'
    }
    // 信令方向：
    // 1：ATP -> RBC  上行
    // 2：RBC -> ATP  下行
    // 3：ATO -> TSRS 上行
    // 4：TSRS -> ATO 下行
    resultObj.protocol = 'L-SGi-C3'
  } else if (protocolType === 'DNS信令') {
    // DNS信令
    resultObj.protocol = 'Dns'
  } else if (protocolType === 'PADIUS信令') {
    // PADIUS信令
    resultObj.protocol = 'Rds'
  } else if (protocolType === 'GRIS数据') {
    // CTC业务数据-- GRIS数据

    // 方向
    // 0：CIR到GRIS
    // 1：GRIS到CIR
    // if (row.direction == 0) {
    //   // 上行
    //   resultObj.isDL = false
    // } else if (row.direction == 1) {
    //   // 下行
    //   resultObj.isDL = true
    // }

    // 包含转移字符
    resultObj.isDL = true
    resultObj.protocol = 'Gris'
  }  

  return resultObj
}
