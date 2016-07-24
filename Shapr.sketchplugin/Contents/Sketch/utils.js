var doc = context.document

// Function to create the label
function createLabel(frame, value) {
    var label = NSTextField.alloc().initWithFrame(frame);
    label.setStringValue(value);
    label.setEditable(false);
    label.setDrawsBackground(false);
    label.setBezeled(false);
    label.setSelectable(false);
    return label;
}
