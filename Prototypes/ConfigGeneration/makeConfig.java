import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class makeConfig {
	
	public static void main(String[] args) {
		
		// Initialize file streams
		BufferedReader buffIn;
		BufferedWriter buffOut;
		
		try {
			buffIn = new BufferedReader(new FileReader("src/test.txt"));
			buffOut = new BufferedWriter(new FileWriter("src/config.txt"));
		} catch (IOException e) {
			e.printStackTrace();
			return;
		}
        
        //Create storage and temporary variables
        String str;
        String[] name;
        String[] value;
        int lines = 0;
        
		//Process the .csv file
		try {
			//Write out the opening brace
			buffOut.write("[ ");
			buffOut.newLine();
			
			//Read in the first line. Should be the number of data lines (categories excluded)
			lines = Integer.parseInt(buffIn.readLine());
			
			//Read in first data line and set categories
            str = buffIn.readLine();
            name = str.split(",");
            
			while(lines > 0){
				str = buffIn.readLine();
	            value = str.split(",");
	            
				if(null == str)  //Check to make sure str exists. Can throw an error and stop otherwise.
					return;
				else
					value = str.split(",");
				
				str = "{";
				for(int i = 0; i < value.length; i++){
					str += '"' + name[i] + '"' + " : " + '"' + value[i] + '"';
					if(i < value.length -1)
						str += ", ";
				}
				
				str += "}";
				if(lines > 1)
					str += ",";
				
				buffOut.write(str);
				buffOut.newLine();
			
				lines--;
			}
			
			//Write final brace
			buffOut.write("]");
			
			buffIn.close();
			buffOut.close();
			
		} catch (NumberFormatException e) {
			e.printStackTrace();
			return;
		} catch (IOException e) {
			e.printStackTrace();
			return;
		}
		
		return;
	}

}