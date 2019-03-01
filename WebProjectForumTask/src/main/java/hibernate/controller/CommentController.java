package hibernate.controller;

import hibernate.dto.CommentDTO;
import hibernate.service.interfaces.BasicService;
import hibernate.validation.ValidationErrorBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    @Qualifier("commentService")
    private BasicService commentService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<CommentDTO> getAllCommentDTO() {
        return commentService.getAll();
    }

    @RequestMapping(value = "", params = {"search"}, method = RequestMethod.GET)
    @ResponseBody
    public List<CommentDTO> getSearchedComments(@RequestParam("search") String search) {
        return commentService.getLikeName(search);
    }

    @RequestMapping(value = "/{commentId}/admin", method = RequestMethod.GET)
    public CommentDTO getCommentDTO(@PathVariable int commentId) {
        return (CommentDTO) commentService.getById(commentId);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity addCommentDTO(@Valid @RequestBody CommentDTO commentDTO, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        commentService.add(commentDTO);
        return ResponseEntity.ok(commentDTO);
    }

    @RequestMapping(value = "/{commentId}/admin", method = RequestMethod.PUT)
    public ResponseEntity updateCommentDTO(@Valid @RequestBody CommentDTO commentDTO, Errors errors, @PathVariable int commentId) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(ValidationErrorBuilder.fromBindingErrors(errors));
        }
        commentService.update(commentId, commentDTO);
        return ResponseEntity.ok(commentDTO);
    }

    @RequestMapping(value = "/{commentId}/admin", method = RequestMethod.DELETE)
    public void deleteCommentDTO(@PathVariable int commentId) {
        commentService.delete(commentId);
    }

}
