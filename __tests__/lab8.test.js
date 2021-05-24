import { PageEmittedEvents } from "puppeteer";

describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click('journal-entry');
    let inclue_entry = page.url().includes(`/#entry1`);
    expect(inclue_entry).toBe(true);

  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    let title=await page.$('h1');
    let a = await page.evaluate(title => title.textContent, title);
    expect(a).toBe("Entry 1");

  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {

    let entrypage= await page.$('entry-page');
    let entry= await page.evaluate(entrypage => entrypage.entry, entrypage);
    expect(entry).toEqual(
      {
        title: 'You like jazz?',
        date: '4/25/2021',
        content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
        image: {
          src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
          alt: 'bee with sunglasses'
        }
      }
    );
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        {
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */

  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    let body= await page.$('body');
    let bodycontent= await page.evaluate(body=>body.className, body);
    expect(bodycontent).toBe("single-entry");
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’

  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    await page.click('header > img');
    let urlstring = page.url().includes(`/#settings`);
    expect(urlstring).toBe(true);

    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”

  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    let body = await page.$('h1');
    let bodycontent = await page.evaluate(body => body.textContent, body);
    expect(bodycontent).toBe("Settings");

  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    let body = await page.$('body');
    let bodycontent = await page.evaluate(body => body.className, body);
    expect(bodycontent).toBe("settings");

    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’

  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    await page.goBack();
    let urlstring = page.url().includes(`/#entry1`);
    expect(urlstring).toBe(true);
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’

  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button once should bring the user back to the home page', async () => {
    await page.goBack();
    expect(page.url()).toBe("http://127.0.0.1:5500/");

  });


  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('test12: When the user if on the homepage, the header title should be Journal Entries', async () => {
    let body = await page.$('h1');
    let bodycontent = await page.evaluate(body => body.textContent, body);
    expect(bodycontent).toBe("Journal Entries");

  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 

  it('test13: On the home page the <body> element should not have any class attribute ', async () => {
    let body = await page.$('body');
    let bodycontent = await page.evaluate(body => body.className, body);
    expect(bodycontent).toBe("");



  });


  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('test14: Verify the url is correct when clicking on the second entry', async () => {
    let entries = await page.$$('journal-entry');
    await entries[1].click();
    await page.waitForNavigation();
    let urlstring = page.url().includes(`/#entry2`);
    expect(urlstring).toBe(true);
  });



   // define and implement test15: Verify the title is current when clicking on the second entry
  it('test15: Verify the title is current when clicking on the second entry ', async () => {
    let body = await page.$('h1');
    let bodycontent = await page.evaluate(body => body.textContent, body);
    expect(bodycontent).toBe("Entry 2");
  });


  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('test16: Verify the entry page contents is correct when clicking on the second entry', async () => {

    let entrypage = await page.$('entry-page');
    let entry = await page.evaluate(entrypage => entrypage.entry, entrypage);
    expect(entry).toEqual(
      {
        title: "Run, Forrest! Run!",
        date: "4/26/2021",
        content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
        image: {
          src: "https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg",
          alt: "forrest running"
        }
      });
  });

  // create your own test 17
  it('test17: check the title of the page 2', async () => {
    let body = await page.$('h1');
    let bodycontent = await page.evaluate(body => body.textContent, body);
    expect(bodycontent).toBe("Entry 2");
  });

  // create your own test 18
  it('test18: click the back button and it will go back to the home page', async () => {
    await page.goBack();
    let body = await page.$('h1');
    let bodycontent = await page.evaluate(body => body.textContent, body);
    expect(bodycontent).toBe("Journal Entries");
  });
  
  // create your own test 19
  it('test19: click forward and click backward and see still at the home page', async () => {
    await page.goForward();
    await page.goBack();
    let body = await page.$('h1');
    let bodycontent = await page.evaluate(body => body.textContent, body);
    expect(bodycontent).toBe("Journal Entries");
  });

  // create your own test 20
  it('test20: click the image and go back to see we are at the home page', async() => {
    await page.click('img');
    await page.goBack();
    var url = page.url();
    expect(url).toBe('http://127.0.0.1:5500/');
  });
  
});
