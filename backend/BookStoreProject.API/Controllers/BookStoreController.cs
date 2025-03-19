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
        public IActionResult GetProjects(int pageSize = 5, int pageNumber = 1, string pageOrder = "az")
        {
            var query = _bookstoreContext.Books.AsQueryable();

            // Apply ordering based on pageOrder
            if (pageOrder.ToLower() == "az")
            {
                query = query.OrderBy(b => b.Title); // Change Title to the relevant sorting field
            }
            else if (pageOrder.ToLower() == "za")
            {
                query = query.OrderByDescending(b => b.Title);
            }

            var paginatedBooks = query.Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = _bookstoreContext.Books.Count();

            return Ok(new
            {
                Books = paginatedBooks,
                TotalNumBooks = totalNumBooks
            });
        }
        
    }
}