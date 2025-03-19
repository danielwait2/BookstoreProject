using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using BookStoreProject.API.Data;

namespace BookStoreProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookStoreController : ControllerBase
    {
        private  BookStoreDbContext _bookstoreContext;
     
        public BookStoreController(BookStoreDbContext temp) => _bookstoreContext = temp;

        [HttpGet("AllProjects")]
        public IActionResult GetProjects(int pageSize = 5, int pageNumber = 1)
        {
            var something = _bookstoreContext.Books.Skip((pageNumber-1)*pageSize).Take(pageSize).ToList();

            var totalNumProjects = _bookstoreContext.Books.Count();
         
            return Ok(new
            {
                Books = something,
                TotalNumBooks = totalNumProjects
            }); 
        }
        
    }
}