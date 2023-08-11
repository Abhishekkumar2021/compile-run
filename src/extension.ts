// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const updateStatusBarItem = (statusBarItem: vscode.StatusBarItem) => {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		statusBarItem.hide();
		return;
	}
	statusBarItem.show();
};

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Add an item to the status bar
	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	// Icon for the status bar item
	statusBarItem.text = '$(play) Compile & Run';
	statusBarItem.command = 'compile-run.compileRun';
	context.subscriptions.push(statusBarItem);
	statusBarItem.show();

	// Update status bar item based on events
	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(() => updateStatusBarItem(statusBarItem)));

	// Add a command to compile and run
	const compileRun = vscode.commands.registerCommand('compile-run.compileRun', async () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const terminal = vscode.window.createTerminal('Compile & Run');
			const document = editor.document;
			const filePath = document.fileName;
			const directory = filePath.substring(0, filePath.lastIndexOf('\\'));
			const extension = filePath.split('.').pop();
			const fileName = filePath.split('\\').pop()?.split('.')[0];

			if(extension !== 'cpp') {
				vscode.window.showErrorMessage('File is not a c++ file');
				return;
			}
			
			// First check if we are on linux or windows
			if (process.platform === 'win32') {
				// Windows
				vscode.window.showInformationMessage('Please wait while we compile and run your code');
				// Check if the file is saved or not
				await document.save();
				// Go to that directory and compile and run
				const completeCommand = `cd ${directory} && g++ ${fileName}.cpp -o ${fileName}.exe 2> output.txt && Get-Content input.txt | .\\${fileName}.exe > output.txt && Remove-Item ${fileName}.exe`;
				terminal.sendText(completeCommand);		

			}else {
				// Linux
				vscode.window.showInformationMessage('Please wait while we compile and run your code');
				// Check if the file is saved or not
				await document.save();
				// Go to that directory and compile and run
				const completeCommand = `cd ${directory} && g++ ${fileName}.cpp -o ${fileName} 2> output.txt && cat ./${fileName} < input.txt > output.txt  && rm ${fileName}`;
				terminal.sendText(completeCommand);
			}
			
		} else {
			vscode.window.showErrorMessage('No file is open');
		}
	});
				
	context.subscriptions.push(compileRun);
}

// This method is called when your extension is deactivated
export function deactivate() {}