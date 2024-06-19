import { DrugPlan } from "@/app/model/DrugPlan";
import { Profile } from "@/app/model/Profile";
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { Linking, Platform, StyleSheet, View, useWindowDimensions } from "react-native";
import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { Share } from 'react-native';
import * as Sharing from 'expo-sharing';
import QRCode from "react-native-qrcode-svg";

function BasicDocument({ profile, drugPlan }: { profile: Profile, drugPlan: DrugPlan }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const createPdf = async () => {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();

      // Add a page to the document
      const page = pdfDoc.addPage();

      // Draw some text on the page
      const { width: pageWidth, height: pageHeight } = page.getSize();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const textSize = 12;
      const lineHeight = textSize * 1.2;
      let y = pageHeight - 4 * textSize;

      const profileText = `Profile:\n${JSON.stringify(profile, null, 2)}`;
      const drugPlanText = `Medicaments:\n${JSON.stringify(drugPlan, null, 2)}`;

      const drawText = (text) => {
        const lines = text.split('\n');
        for (const line of lines) {
          page.drawText(line, {
            x: 50,
            y,
            size: textSize,
            font,
          });
          y -= lineHeight;
        }
        y -= lineHeight;
      };

      drawText(profileText);
      drawText(drugPlanText);

      if (Platform.OS === 'ios') {
        const base64Pdf = await pdfDoc.saveAsBase64();
        const filename = 'temp_pdf.pdf';
        const path = FileSystem.documentDirectory + filename;
        await FileSystem.writeAsStringAsync(path, base64Pdf, { encoding: FileSystem.EncodingType.Base64 });
        const uri = path;

        setUrl(uri);
      } else if (Platform.OS === 'android') {
        // Save the PDF document to the device's file system
        const pdfBytes = await pdfDoc.save();
        const uri = FileSystem.documentDirectory + 'example.pdf';
        await FileSystem.writeAsStringAsync(uri, pdfBytes, { encoding: FileSystem.EncodingType.Base64 });

        setUrl(uri);
      } else {
        // Create a Uint8Array that contains the PDF data
        const pdfBytes = await pdfDoc.save();
        // Create a Blob object from the Uint8Array
        const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
        // Create a URL that can be used to open the PDF document in a new browser tab or window
        const url = URL.createObjectURL(pdfBlob);
        // Set the URL state variable
        setUrl(url);
        console.log('qr', url)
      }

    };

    createPdf();
  }, [profile, drugPlan]);



  const downloadPdf = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'medicaplan.pdf';
    link.click();
  };

  return (
    <View style={styles.container}>
      {url && <QRCode value={'blob:' + url} size={200} />}
      {Platform.OS === 'android' && url && <Button style={styles.button} mode="contained" children="Télécharger vos informations au format PDF" onPress={() => Sharing.shareAsync(url)} />}
      {Platform.OS === 'ios' && url && <Button style={styles.button} mode="contained" children="Télécharger vos informations au format PDF" onPress={() => Sharing.shareAsync(url)} />}
      {Platform.OS === 'web' && url &&
        <>
          <Button style={styles.button} mode="contained" children="Ouvrir le PDF" onPress={() => window.open(url)} />
          <Button style={styles.button} mode="contained" children="Télécharger vos informations au format PDF" onPress={downloadPdf} />
        </>}
    </View>
  );
}


const styles = StyleSheet.create({
  container: { margin: 'auto', alignItems: 'center' },
  button: {
    margin: '5%',
  },
});

export default BasicDocument;