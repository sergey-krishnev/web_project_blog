package hibernate.fileReader;

import org.apache.log4j.Logger;

import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

public class ScvReader {
    private List<String> badWords;

    private final static Logger logger = Logger.getLogger(ScvReader.class);


    public ScvReader(String nameFile) throws RuntimeException {
        List<String> dataSubject = null;
        try {
            dataSubject = Files.readAllLines(Paths.get(getDirectoryPath() + nameFile), StandardCharsets.UTF_8);

        } catch (IOException | NumberFormatException e) {
            logger.error("JPA error : " + e.getMessage(), e);
        }
        this.badWords = dataSubject;
    }
        public List<String> getBadWords () {
            return badWords;
        }

        public void setBadWords (List<String> badWords) {
            this.badWords = badWords;
        }

    public String getDirectoryPath() {
        String fullPath = this.getClass().getClassLoader().getResource("").getPath();
        int index=fullPath.lastIndexOf("target/");
        fullPath = fullPath.substring(0,index);
        fullPath = fullPath.substring(1);
        return fullPath;
    }

}
