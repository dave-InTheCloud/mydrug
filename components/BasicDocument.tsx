import { DrugPlan } from "@/app/model/DrugPlan";
import { Profile } from "@/app/model/Profile";
import { Document, Page, Text, View, StyleSheet, PDFViewer} from "@react-pdf/renderer";
import { useWindowDimensions } from "react-native";

function printKeyValuesString(obj, level = 0, indent = "  ") {
    if (level > 2 || typeof obj !== "object" || obj === null) {
      return ""; // Base case: Empty string for non-objects, null, or exceeding level limit
    }
  
    let string = "";
    for (const key in obj) {
      const value = obj[key];
      const indentedKey = `${indent}Key: ${key}, Value: ${value}\n`;
      string += indentedKey;
  
      if (typeof value === "object" && value !== null) {
        if (Array.isArray(value)) {
          if (key === "contact") {
            // Handle array of contact objects
            string += `${indent}  Contact:\n`;
            for (let i = 0; i < value.length; i++) {
              const nestedString = printKeyValuesString(value[i], level + 1, indent + "    ");
              string += nestedString;
            }
          } else {
            // Handle other arrays
            for (let i = 0; i < value.length; i++) {
              const nestedString = printKeyValuesString(value[i], level + 1, indent + "  ");
              string += nestedString;
            }
          }
        } else {
          // Handle nested object
          const nestedString = printKeyValuesString(value, level + 1, indent + "  ");
          string += nestedString;
        }
      }
    }
    return string;
  }
  



// Create Document Component
function BasicDocument({ profile, drugPlan }: { profile: Profile, drugPlan: DrugPlan }) {
    
const { width, height } = useWindowDimensions();
const styles = createStyles(width, height);

    return (
        <PDFViewer style={styles.viewer}>
            {/* Start of the document*/}
            <Document>
                {/*render a single page*/}
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text>Profile:</Text>
                        <Text>{printKeyValuesString(profile)}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text>Medicaments:</Text>
                        <Text>{printKeyValuesString(drugPlan)}</Text>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
}


// Create styles
const createStyles = (width, height) => StyleSheet.create({
    page: {
        backgroundColor: "#d11fb6",
        color: "white",
    },
    section: {
        margin: 10,
        padding: 10,
    },
    viewer: {
        width: width, //the pdf viewer will take up all of the width and height
        height: '100%',
    },
});

export default BasicDocument;