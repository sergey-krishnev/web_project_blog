package hibernate.controller;

import hibernate.dto.CommentDTO;
import hibernate.dto.SubjectDTO;
import hibernate.dto.TopicDTO;
import hibernate.service.interfaces.CRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/blog")
public class BlogController {

    @Autowired
    private CRUDService crudService;

    @Autowired
    private MessageSource messageSource;

    @RequestMapping(value = "/topics/{topicId}/subjects", method = RequestMethod.GET)
    public List<SubjectDTO> getSubjectsByTopicId(@PathVariable int topicId) {
        TopicDTO topicDTO = crudService.searchTopicById(topicId);
        return topicDTO.getSubjects();
    }

    @RequestMapping(value = "/subjects/{subjectId}/comments", method = RequestMethod.GET)
    public List<CommentDTO> getCommentsDTO(@PathVariable int subjectId) {
        SubjectDTO subjectDTO = crudService.searchSubjectById(subjectId);
        return subjectDTO.getComments();
    }

}
