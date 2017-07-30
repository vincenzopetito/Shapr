var onRun = function(context) {

    //Import utils.js
    @import "utils.js"

    function showAlertWindow() {
        var alertWindow = COSAlertWindow.new()

        // Set the icon fot the view
        alertWindow.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("create-circle.png").path()));

        alertWindow.setMessageText('Create new circle')

        // Create the main view that contain the filed
        var mainView = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 360, 120));
        alertWindow.addAccessoryView(mainView);

        // Add labels
        var diameterLabel = createLabel(NSMakeRect(0, 100, 140, 20), "Diameter");
        mainView.addSubview(diameterLabel);

        var bgLabel = createLabel(NSMakeRect(160, 100, 140, 20), "Background");
        mainView.addSubview(bgLabel);

        var xLabel = createLabel(NSMakeRect(0, 40, 140, 20), "X");
        mainView.addSubview(xLabel);

        var yLabel = createLabel(NSMakeRect(160, 40, 140, 20), "Y");
        mainView.addSubview(yLabel);

        // Add inputs
        var diameterInput = NSTextField.alloc().initWithFrame(NSMakeRect(0, 80, 140, 20));
        diameterInput.setStringValue("100");
        mainView.addSubview(diameterInput);

        var bgInput = NSTextField.alloc().initWithFrame(NSMakeRect(160, 80, 140, 20));
        bgInput.setStringValue("cccccc");
        mainView.addSubview(bgInput);

        var xInput = NSTextField.alloc().initWithFrame(NSMakeRect(0, 20, 140, 20));
        xInput.setStringValue("0");
        mainView.addSubview(xInput);

        var yInput = NSTextField.alloc().initWithFrame(NSMakeRect(160, 20, 140, 20));
        yInput.setStringValue("0");
        mainView.addSubview(yInput);

        // Add buttons to confirm or cancel
        alertWindow.addButtonWithTitle('OK')
        alertWindow.addButtonWithTitle('Cancel')

        // Allow tab to switch between inputs
        alertWindow.alert().window().setInitialFirstResponder(diameterInput);
        diameterInput.setNextKeyView(bgInput)
        bgInput.setNextKeyView(xInput)
        xInput.setNextKeyView(yInput)
        yInput.setNextKeyView(diameterInput)

        //If "OK" is clicked
        if (alertWindow.runModal() == "1000") {

            // Create variable with user's input
            var size = diameterInput.stringValue()
            var x = xInput.stringValue()
            var y = yInput.stringValue()
            var bgColor = bgInput.stringValue()

            //Call the createRect function passing the user's input
            createCircle(x, y, size, bgColor);

        } else {
            return null
        }
    }

    function createCircle(x, y, size, bgColor) {

        var newCircle = MSOvalShape.alloc().init();
        newCircle.frame = MSRect.rectWithRect(NSMakeRect(x,y,size,size));

        var circleGroup = MSShapeGroup.shapeWithPath_(newCircle);

        var fillCircle = circleGroup.style().addStylePartOfType(0);
        fillCircle.color = MSImmutableColor.colorWithSVGString("#" + bgColor);

        context.document.currentPage().currentArtboard().addLayer_(circleGroup);

    }

    showAlertWindow();
};
