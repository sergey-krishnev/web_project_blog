package hibernate.controller;

import hibernate.dto.CommentDTO;
import hibernate.dto.SubjectDTO;
import hibernate.dto.TopicDTO;
import hibernate.service.interfaces.CRUDService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/blog")
public class BlogController {

    @Autowired
    private CRUDService crudService;

    @Autowired
    private MessageSource messageSource;

    @RequestMapping(value = "/topics", method = RequestMethod.GET)
    public List<TopicDTO> getAllTopicsDTO() {
        return crudService.searchAllTopic();
    }

    @RequestMapping(value = "/topics/{topicId}", method = RequestMethod.GET)
    public TopicDTO getTopicId(@PathVariable int topicId) {
        return crudService.searchTopicById(topicId);
    }

    @RequestMapping(value = "/topics/{topicId}/subjects", method = RequestMethod.GET)
    public List<SubjectDTO> getSubjectsByTopicId(@PathVariable int topicId) {
        TopicDTO topicDTO = crudService.searchTopicById(topicId);
        return topicDTO.getSubjects();
    }

    @RequestMapping(value = "/subjects/{subjectId}", method = RequestMethod.GET)
    public SubjectDTO getSubjectDTO(@PathVariable int subjectId) {
        return crudService.searchSubjectById(subjectId);
    }

    @RequestMapping(value = "/comments", method = RequestMethod.GET)
    public List<CommentDTO> getAllCommentDTO() {
        return crudService.searchAllComment();
    }

    @RequestMapping(value = "/subjects/{subjectId}/comments", method = RequestMethod.GET)
    public List<CommentDTO> getCommentsDTO(@PathVariable int subjectId) {
        SubjectDTO subjectDTO = crudService.searchSubjectById(subjectId);
        return subjectDTO.getComments();
    }

    @RequestMapping(value = "/comments", method = RequestMethod.POST)
    public ResponseEntity addCommentDTO(@Valid @RequestBody CommentDTO commentDTO, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        crudService.insertComment(commentDTO);
        return ResponseEntity.ok(commentDTO);
    }

    @RequestMapping(value = "/topics/subjects", method = RequestMethod.GET)
    public List<SubjectDTO> getAllSubjectsDTO() {
        return crudService.searchAllSubject();
    }
}
