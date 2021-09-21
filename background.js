window.mainWindow = null;
 
chrome.runtime.onStartup.addListener(function()
{
	console.log("onStartup");
	openMainWindow("minimized");	
});

chrome.browserAction.onClicked.addListener(function()
{
	openMainWindow();
});

chrome.windows.onCreated.addListener(function(window)
{
	console.debug("opening window ", window);
})

chrome.windows.onRemoved.addListener(function(win)
{
	if (mainWindow && win == mainWindow.id)
	{
		mainWindow = null;
	}			
});
	
function closeMainWindow()
{
    if (mainWindow)
    {
        chrome.windows.remove(mainWindow.id);
		mainWindow = null;
    }
}

function openMainWindow(state)
{
    if (!mainWindow)
    {
        var data = {url: chrome.runtime.getURL("index.html"), type: "popup", focused: true};
		
        if (state)
        {
            delete data.focused;
            data.state = state;
        }		

        chrome.windows.create(data, function (win)
        {
            mainWindow = win;
			chrome.windows.update(mainWindow.id, {width: 900, height: 800});
        });

    } else {
        chrome.windows.update(mainWindow.id, {focused: true});
    }
}

