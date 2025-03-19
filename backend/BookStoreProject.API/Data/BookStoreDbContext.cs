using Microsoft.EntityFrameworkCore;

namespace BookStoreProject.API.Data;

public class BookStoreDbContext : DbContext
{
    public BookStoreDbContext(DbContextOptions<BookStoreDbContext> options) : base(options)
    {
        
    }
    
    public DbSet<Book> Books { get; set; }
}