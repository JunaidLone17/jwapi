
const cheerio = require('cheerio').default
const express = require('express')
const puppeteer = require('puppeteer');
const app = express()
const PORT = process.env.PORT || 8080
app.get('/', (req, res) => {
  console.log("Check Alpha");
(async () => {
  try {
   
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.jwst.nasa.gov/content/webbLaunch/whereIsWebb.html');
    await page.setViewport({ width: 1200, height: 800 })
    await autoScroll(page)
    await page.waitForSelector('#milesEarth', { timeout: 5000 });

    const body = await page.evaluate(() => {
      return document.querySelector('body').innerHTML;
    });
    //console.log(body);
    let $ = cheerio.load(body);
    
      var dist = "#NASAwebb \n @Nasawebb Distance From Earth : " + $('#milesEarth', body).text() + " miles"
    var status =  $('.oneLiner', body).text().split(".")[0]; 
	var infodata = $('.ssdItemDetailPanelContent h1',body)
	var linehead = "Current Deployment Step:" + infodata.text()
    var eventtime = $(".nominalEventTime", body).text()
    let image = $('#ssdItemDetailPanelImageWrap', body)
var pctcmpt = $('#percentageCompleted', body).text()
	var hotside = $('#tempWarmSide1F',body).text()
	var lowside = $('#tempCoolSide2F', body).text()
	var timesince = $('#launchElapsedTime',body).text()
	var cruisespeed = $('#speedMi', body).text()
    var imagelink = image.children().last().attr()
    var imglink = "https://www.jwst.nasa.gov" + imagelink['src'];
      var response = {
        'Distance': dist,
	'Heading':linehead,
        'Deployment': status,
	'pctcomplete':pctcmpt,
	'hotsidetemp':hotside,
	'lowsidetemp':lowside,
	'TimeSinceLaunch':timesince,
	'speed':cruisespeed,
        'eventtime' : "\nL + " + timesince ,
      'imglink':imglink }  
    res.json(response)
      
   
    

      
      await browser.close();
    
  } catch (error) {
    console.log(error);
  }
   })();
     

})
app.get('/metric', (req, res) => {
  console.log("Check Alpha");
(async () => {
  try {
   
    const browsero = await puppeteer.launch();
    const pageo = await browsero.newPage();
    await pageo.goto('https://www.jwst.nasa.gov/content/webbLaunch/whereIsWebb.html?units=metric');
    await pageo.setViewport({ width: 1200, height: 800 })
    await autoScroll(pageo)
    await pageo.waitForSelector('#kmsEarth', { timeout: 5000 });

    const bodyo = await pageo.evaluate(() => {
      return document.querySelector('body').innerHTML;
    });
    //console.log(body);
    let $ = cheerio.load(bodyo);
    
      var disto = "#NASAwebb \n @Nasawebb Distance From Earth : " + $('#kmsEarth', bodyo).text() + " KMs."
    var statuso =  $('.oneLiner', bodyo).text().split(".")[0]; 
	var infodata = $('.ssdItemDetailPanelContent h1',bodyo)
	var lineheado = "Current Deployment Step:" + infodata.text()
    var eventtimeo = $(".nominalEventTime", bodyo).text()
    let image = $('#ssdItemDetailPanelImageWrap', bodyo)
var pctcmpto = $('#percentageCompleted', bodyo).text()
	var hotsideo = $('#tempWarmSide2C',bodyo).text()
	var lowsideo = $('#tempCoolSide2C', bodyo).text()
	var timesinceo = $('#launchElapsedTime',bodyo).text()
	var cruisespeedo = $('#speedKm', bodyo).text()
    var imagelink = image.children().last().attr()
    var imglink = "https://www.jwst.nasa.gov" + imagelink['src'];
      var responseo = {
        'Distance': disto,
	'Heading':lineheado,
        'Deployment': statuso,
	'pctcomplete':pctcmpto,
	'hotsidetemp':hotsideo,
	'lowsidetemp':lowsideo,
	'TimeSinceLaunch':timesinceo,
	'speed':cruisespeedo,
        'eventtime' : "\nL + " + timesinceo ,
      'imglink':imglink }  
    res.json(responseo)
      
   
    

      
      await browser.close();
    
  } catch (error) {
    console.log(error);
  }
   })();
     

})
 
app.listen(PORT, () => {
    console.log("PORT UP")
})
async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

