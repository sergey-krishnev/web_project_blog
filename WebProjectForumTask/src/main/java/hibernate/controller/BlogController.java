package hibernate.controller;

import hibernate.dto.CommentDTO;
import hibernate.dto.SubjectDTO;
import hibernate.dto.TopicDTO;
import hibernate.service.implementations.CommentServiceImpl;
import hibernate.service.implementations.SubjectServiceImpl;
import hibernate.service.implementations.TopicServiceImpl;
import hibernate.service.interfaces.CRUDService;
import hibernate.validation.ValidationErrorBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/blog")
public class BlogController {

    @Autowired
    private CommentServiceImpl commentService;

    @Autowired
    private SubjectServiceImpl subjectService;

    @Autowired
    private TopicServiceImpl topicService;

    @Autowired
    private MessageSource messageSource;

    @RequestMapping(value = "/topics", method = RequestMethod.GET)
    public List<TopicDTO> getAllTopicsDTO() {
        return topicService.getAll();
    }

    @RequestMapping(value = "/topics/{topicId}", method = RequestMethod.GET)
    public TopicDTO getTopicId(@PathVariable int topicId) {
        return topicService.getById(topicId);
    }

    @RequestMapping(value = "/topics/{topicId}/subjects", method = RequestMethod.GET)
    public List<SubjectDTO> getSubjectsByTopicId(@PathVariable int topicId) {
        TopicDTO topicDTO = topicService.getById(topicId);
        return topicDTO.getSubjects();
    }

    @RequestMapping(value = "/subjects/{subjectId}", method = RequestMethod.GET)
    public SubjectDTO getSubjectDTO(@PathVariable int subjectId) {
        return subjectService.getById(subjectId);
    }

    @RequestMapping(value = "/topics/subjects", method = RequestMethod.POST)
    public ResponseEntity addSubjectsDTO(@Valid @RequestBody SubjectDTO subjectDTO, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        subjectService.add(subjectDTO);
        return ResponseEntity.ok(subjectDTO);
    }

    @RequestMapping(value = "/subjects/{subjectId}", method = RequestMethod.PUT)
    public ResponseEntity updateSubjectDTO(@Valid @RequestBody SubjectDTO subjectDTO, Errors errors, @PathVariable int subjectId) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        subjectService.update(subjectId, subjectDTO);
        return ResponseEntity.ok(subjectDTO);
    }

    @RequestMapping(value = "/comments", method = RequestMethod.GET)
    public List<CommentDTO> getAllCommentDTO() {
        return commentService.getAll();
    }

    @RequestMapping(value = "/subjects/{subjectId}/comments", method = RequestMethod.GET)
    public List<CommentDTO> getCommentsDTO(@PathVariable int subjectId) {
        SubjectDTO subjectDTO = subjectService.getById(subjectId);
        return subjectDTO.getComments();
    }

    @RequestMapping(value = "/comments", method = RequestMethod.POST)
    public ResponseEntity addCommentDTO(@Valid @RequestBody CommentDTO commentDTO, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        commentService.add(commentDTO);
        return ResponseEntity.ok(commentDTO);
    }

    @RequestMapping(value = "/topics/subjects", method = RequestMethod.GET)
    public List<SubjectDTO> getAllSubjectsDTO() {
        return subjectService.getAll();
    }
}
