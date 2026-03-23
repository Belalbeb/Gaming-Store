using GamingStore.models;
using GamingStore.Services;
using GamingStore.wwwroot.images.products;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace GamingStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProduct ProductServices;

        public ProductController(IProduct product)
        {
            this.ProductServices = product;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            return Ok(await ProductServices.GetAllProductAsync());

        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById([FromRoute]int id)
        {
            var product =await ProductServices.GetProductById(id);
            return Ok(product);
        }
        [HttpPost("create")]
        public async Task<IActionResult> AddProduct([FromForm] ProductCreateDto product)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid Inputs");
           await ProductServices.AddProduct(product);

            return Created();


        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> updateProduct([FromRoute]int id, ProductCreateDto productCreateDto)
        {
             await ProductServices.UpdateProduct(id, productCreateDto);
            return Ok();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> ChangeLovedVal([FromRoute]int id,[FromBody]bool liked)
        {
            var result =await ProductServices.UpdateLoved(id,liked);
            if (!result)
                return BadRequest();
            
            return Ok();

        }
        [HttpGet("getbycat/{cat}")]
        public async Task<IActionResult> GetByCategory(ProductCategory cat)
        {
            var product = await ProductServices.GetProductWithSameCategory(cat);
            return Ok(product);
        }
        [HttpGet("getCategories")]
        public async Task<IActionResult> GetAllCat()
        {
         var cats=  await ProductServices.GetAllCat();
            return Ok(cats);
        }
    }
}
