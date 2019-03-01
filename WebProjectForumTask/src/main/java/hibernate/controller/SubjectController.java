package hibernate.controller;

import hibernate.dto.CommentDTO;
import hibernate.dto.SubjectDTO;
import hibernate.dto.TopicDTO;
import hibernate.service.interfaces.BasicService;
import hibernate.validation.ValidationErrorBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/subjects")
public class SubjectController {

    @Autowired
    @Qualifier("subjectService")
    private BasicService subjectService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<SubjectDTO> getAllSubjectDTO() {
        return subjectService.getAll();
    }

    @RequestMapping(value = "", params = {"search"}, method = RequestMethod.GET)
    public List<SubjectDTO> getSearchedSubjects(@RequestParam("search") String search) {
        return subjectService.getLikeName(search);
    }

    @RequestMapping(value = "/{subjectId}", method = RequestMethod.GET)
    public SubjectDTO getSubjectDTO(@PathVariable int subjectId) {
        return (SubjectDTO) subjectService.getById(subjectId);
    }

    @RequestMapping(value = "/{subjectId}/comments", method = RequestMethod.GET)
    public List<CommentDTO> getCommentsDTO(@PathVariable int subjectId) {
        SubjectDTO subjectDTO = (SubjectDTO) subjectService.getById(subjectId);
        return subjectDTO.getComments();
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity addSubjectDTO(@Valid @RequestBody SubjectDTO subjectDTO, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        subjectService.add(subjectDTO);
        return ResponseEntity.ok(subjectDTO);
    }

    @RequestMapping(value = "/{subjectId}", method = RequestMethod.PUT)
    public ResponseEntity updateSubjectDTO(@Valid @RequestBody SubjectDTO subjectDTO, Errors errors, @PathVariable int subjectId) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        subjectService.update(subjectId, subjectDTO);
        return ResponseEntity.ok(subjectDTO);
    }

    @RequestMapping(value = "/{subjectId}/admin", method = RequestMethod.DELETE)
    public void deleteSubjectDTO(@PathVariable int subjectId) {
        subjectService.delete(subjectId);
    }

}
