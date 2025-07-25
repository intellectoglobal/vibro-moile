import Accordion from "@/components/Accordion";
import { ALL_FORMS, FOLDERS } from "@/constants/forms";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import FileList from "../ListItems/FileList";
import FolderList from "../ListItems/FolderList";
import * as Api from "@/services";
import { FOLDER, FORMS } from "@/services/constants";

export const DATA = [
  { id: "1", name: "Documents" },
  { id: "2", name: "Pictures" },
  { id: "3", name: "Music" },
  { id: "4", name: "Videos" },
];

export const DATA_FILE = [
  { id: "1", title: "File 1" },
  { id: "2", title: "File 2" },
  { id: "3", title: "File 3" },
  { id: "4", title: "File 4" },
  { id: "5", title: "File 5" },
  { id: "6", title: "File 6" },
  { id: "7", title: "File 7" },
  { id: "8", title: "File 8" },
];

export interface Folder {
  id: string;
  name: string;
}
export interface Form {
  id: string;
  title: string;
}

export default function NewForm() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [forms, setForms] = useState<Form[]>([]);

  const routeFormsFolder = (folder: any) => {
    router.push({
      pathname: "/(app)/(tabs)/forms/folder-list",
      params: { folderName: folder.name, folderId: folder.id }, // Example parameter
    });
  };
  const routeFormsFileList = () => {
    router.push("/(app)/(tabs)/forms/multi-stage-form");
  };

  const getOrgFolder = async () => {
    try {
      const response = (await Api.get(FOLDER)) as any;
      console.log("response", response)
      setFolders(response || []);
    } catch (error: any) {
      console.error("Error Occurred in the getOrgFolder ::", error);
    }
  };

  const getFolderLessFormsForUser = async () => {
    try {
      const response = (await Api.get(FORMS)) as any;
      console.log("response", response)
      setForms(response || []);
    } catch (error: any) {
      console.error("Error Occurred in the getOrgFolder ::", error.message);
    }
  };

  useEffect(() => {
    getOrgFolder();
    getFolderLessFormsForUser();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Accordion
          title={FOLDERS}
          containerStyle={styles.accordionContainer}
          headerStyle={styles.accordionHeader}
          titleStyle={styles.accordionTitle}
          iconColor="#6200ee"
          expanded={true}
          onPress={(expanded) => console.log("Accordion expanded:", expanded)}
        >
          <FlatList
            style={{ maxHeight: 125 }}
            data={folders}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <FolderList items={item} onClick={routeFormsFolder} />
            )}
          />
        </Accordion>
        <View style={{ flex: 3, marginBottom: 35 }}>
          <Accordion
            title={ALL_FORMS}
            containerStyle={styles.accordionContainer}
            headerStyle={styles.accordionHeader}
            titleStyle={styles.accordionTitle}
            iconColor="#6200ee"
            expanded={true}
            onPress={(expanded) => console.log("Accordion expanded:", expanded)}
          >
            <FlatList
              data={forms}
              contentContainerStyle={{ paddingBottom: 50 }}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <FileList items={item} onClick={routeFormsFileList} />
              )}
            />
          </Accordion>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    //backgroundColor: "#f5f5f5",
  },
  accordionContainer: {
    marginBottom: 10,
  },
  accordionHeader: {
    backgroundColor: "#e3f2fd",
  },
  accordionTitle: {
    color: "#6200ee",
    fontWeight: "bold",
  },
  contentText: {
    fontSize: 14,
    marginBottom: 8,
    color: "#333",
  },
});
