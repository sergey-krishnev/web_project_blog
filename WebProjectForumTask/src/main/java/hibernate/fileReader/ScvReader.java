package hibernate.fileReader;

import org.apache.log4j.Logger;
import org.springframework.core.io.ClassPathResource;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class ScvReader {
    private List<String> badWords;

    private final static Logger logger = Logger.getLogger(ScvReader.class);


    public ScvReader(String nameFile) throws RuntimeException, IOException {
        List<String> dataSubject = null;
       URL fileUrl = getClass().getResource("/" + nameFile);
        if (fileUrl != null) {
            String stringUrl = fileUrl.getPath();
            stringUrl = stringUrl.substring(1);
            stringUrl = stringUrl.replace("%20"," "); //fixed bug with delimeter
            dataSubject = Files.readAllLines(Paths.get(stringUrl), StandardCharsets.UTF_8);
        } else dataSubject = new ArrayList<>();

        this.badWords = dataSubject;
    }
        public List<String> getBadWords () {
            return badWords;
        }

        public void setBadWords (List<String> badWords) {
            this.badWords = badWords;
        }
}
