import { Products, WPInfo, Pages } from '@/entities';
import { processAndStoreImage } from './imageProcessor';
import { stripHtmlAndUnescape } from '@/lib/stringUtils';
const WC_URL = import.meta.env.WC_URL || process.env.WC_URL;

export async function getProducts(infoData: WPInfo, pages: Pages[], isPreview: boolean = false) { // Renamed function to match file name
  if (!WC_URL) {
    console.error('❌ LỖI: Biến WC_URL chưa được cấu hình trong Environment Variables.');
    return [];
  }

  try {
    // Fetch trang chính sách bảo mật tiếng Việt
    const Response = await fetch(`${WC_URL}/wp-json/wp/v2/product?_embed=true&status=publish`);
    const Pages = Response.ok ? await Response.json() : [];

    let unifiedPages: Products[] = [];
    const pages_product = pages.filter((a:Pages)=> { return a.key === 'products'});
    Pages.forEach((item: any) => {
      // Xác định ID gốc: Nếu có origin_page_id thì dùng nó, nếu không thì dùng chính ID của item (bản tiếng Việt)
      const originKey = (item.acf?.origin_product_id || item.id).toString();
      const featuredImage = item._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
      const lang = item.acf?.product_lang?.value || 'vi'; // Mặc định là tiếng Việt nếu không có trường này
      const currency = item.acf?.currency?.label || '';
      const flatTerms = item._embedded?.['wp:term']?.flat() || [];
      const product_cat_name = flatTerms.find((term: any) => term.id === item.product_cat?.[0])?.name || 'Chưa phân loại';
      const description = stripHtmlAndUnescape(item.content?.rendered);
      let itemcp = unifiedPages.find((t) => t._id === originKey);
      const slugPR = pages_product.find((a:Pages) => a.lang === lang);
      const slug = `${slugPR.slug}/${item.slug}`;
      if (itemcp == null) {
        itemcp = {
          _id: originKey,
          slug: { [lang]: slug },
          slugP: { [lang]: slugPR.slug },
          itemImage: { [lang]: featuredImage},
          itemName: { [lang]: item.title?.rendered || '' },
          itemDescription: { [lang]: description },
          itemCurrency: { [lang]: currency },
          itemPrice: { [lang]: item.price || -1},
          category: {[lang]: product_cat_name || ''}
        };
        unifiedPages.push(itemcp);
      }
      else {
        itemcp.slug = { ...itemcp.slug, [lang]: slug };
        itemcp.slugP = { ...itemcp.slugP, [lang]: slugPR.slug };
        itemcp.itemImage = { ...itemcp.itemImage, [lang]: featuredImage };
        itemcp.itemName = { ...itemcp.itemName, [lang]: item.title?.rendered || '' };
        itemcp.itemDescription = { ...itemcp.itemDescription, [lang]: description };
        itemcp.itemCurrency = { ...itemcp.itemCurrency, [lang]: currency };
        itemcp.itemPrice = { ...itemcp.itemPrice, [lang]: item.price || -1};
        itemcp.category = { ...itemcp.category, [lang]: product_cat_name || ''};
      }
    });
    // Xử lý lưu ảnh static cho tất cả template đã gom nhóm
    return await Promise.all(Object.values(unifiedPages).map(async (p: any): Promise<Products> => {
      if (p.image) {
        for (const id of Object.keys(p.image)) {
          const store = await processAndStoreImage({
            imageUrl: p.image[id],
            wcUrl: WC_URL,
            publicDirBase: 'images/products', // Lưu vào thư mục riêng cho sản phẩm
            isPreview: isPreview, // Truyền trạng thái preview
          });
          p.image[id] = store;
        }
      }
      return p;
    }));
    
  } catch (error) {
    console.error(`❌ LỖI fetch Products:`, error);
    // Trả về đối tượng rỗng để tránh lỗi undefined trong các component React
    return [];
  }
}