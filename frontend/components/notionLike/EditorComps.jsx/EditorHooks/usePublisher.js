import { useCallback } from "react";
import { toast } from "sonner";
import { fetcher, imageToBase64 } from "@/lib/helpers.js";

export function usePublisher(editorRef, title, subtitle, wordCount, form, router, setIsPublishing, apiUrl) {
  const handlePublish = useCallback(async () => {
    if (!editorRef.current) return;

    setIsPublishing(true);
    try {
      const editorData = await editorRef.current.save();
      
      function enhanceBlockData(block, index) {
        const baseData = { ...block.data };
        
        switch (block.type) {
          case 'header':
            return {
              ...baseData,
              anchor: baseData.text ? baseData.text.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '',
              alignment: baseData.alignment || 'left'
            };
            
          case 'paragraph':
            return {
              ...baseData,
              alignment: baseData.alignment || 'left'
            };
            
          case 'image':
            return {
              ...baseData,
              alt: baseData.alt || baseData.caption || 'Image',
              alignment: baseData.alignment || 'center',
              stretched: baseData.stretched || false,
              withBorder: baseData.withBorder || false,
              withBackground: baseData.withBackground || false
            };
            
          case 'list':
            return {
              ...baseData,
              items: baseData.items ? baseData.items.map(item => ({
                content: typeof item === 'string' ? item : item.content || item,
                items: []
              })) : []
            };
            
          case 'checklist':
            return {
              ...baseData,
              items: baseData.items ? baseData.items.map(item => ({
                content: item.text || item.content,
                checked: item.checked || false
              })) : []
            };
            
          case 'code':
            return {
              ...baseData,
              language: baseData.language || 'javascript',
              showLineNumbers: true
            };
            
          case 'quote':
            return {
              ...baseData,
              alignment: 'left',
              style: 'border-left'
            };
            
          case 'warning':
            return {
              ...baseData,  
              level: baseData.level || 'warning'
            };
            
          case 'table':
            return {
              ...baseData,
              withHeadings: baseData.withHeadings !== false
            };
            
          case 'embed':
            return {
              ...baseData,
              width: baseData.width || 560,
              height: baseData.height || 315
            };
            
          default:
            return baseData;
        }
      }
      
      const readingTime = Math.ceil(wordCount / 250);
      
      const tableOfContents = editorData.blocks
        .filter(block => block.type === 'header')
        .map((block, index) => ({
          id: block.id || `header_${index}`,
          text: block.data.text,
          level: block.data.level,
          anchor: block.data.text ? block.data.text.toLowerCase().replace(/[^a-z0-9]+/g, '-') : ''
        }));
      
      const blockTypes = editorData.blocks.reduce((acc, block) => {
        acc[block.type] = (acc[block.type] || 0) + 1;
        return acc;
      }, {});

      const enhancedData = {
        document: {
          id: `doc_${Date.now()}`,
          title: title.trim() || "Untitled",
          subtitle: subtitle.trim() || "",
          slug: (title || "untitled").toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          language: "en",
          version: "1.0.0",
          featuredImage: form.banner ? {
            url: form.banner,
            alt: "Featured image",
            caption: ""
          } : null,
          author: {
            id: "user_001",
            name: "Author Name",
            avatar: "/default-avatar.png",
            bio: "Content creator"
          }
        },
        
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        
        meta: {
          wordCount: wordCount,
          readingTime: readingTime,
          characterCount: JSON.stringify(editorData).length,
          estimatedReadingSpeed: 250
        },
        
        categories: form.categories || [],
        tags: [],
        
        settings: {
          privacy: form.privacy || "public",
          password: null,
          allowComments: true,
          allowSharing: true,
          seoOptimized: true,
          showTableOfContents: tableOfContents.length > 0,
          enableAnalytics: true
        },
        
        pricing: {
          type: form.price > 0 ? "paid" : "free",
          price: parseInt(form.price, 10) || 0,
          currency: "USD",
          discount: null
        },
        
        schedule: {
          publishAt: new Date().toISOString(),
          unpublishAt: form.endDate || null,
          featured: {
            enabled: false,
            startDate: form.startDate || new Date().toISOString(),
            endDate: form.endDate || null
          }
        },
        
        statistics: {
          blockCount: editorData.blocks.length,
          wordCount: wordCount,
          readingTime: readingTime,
          views: 0,
          likes: 0,
          shares: 0,
          comments: 0,
          blockTypes: blockTypes
        },
        
        seo: {
          metaTitle: title || "Untitled",
          metaDescription: subtitle || `Learn about ${title}`,
          keywords: form.categories || [],
          ogImage: form.banner || null,
          canonicalUrl: ""
        },
        
        blocks: editorData.blocks.map((block, index) => ({
          id: block.id || `block_${index}`,
          type: block.type,
          data: enhanceBlockData(block, index),
          meta: {
            order: index,
            created: new Date().toISOString()
          }
        })),
        
        tableOfContents: tableOfContents
      };
    
      let base64Banner = "";
      if (form.banner) {
        try {
          base64Banner = await imageToBase64(form.banner);
        } catch (err) {
          console.error("Banner conversion failed:", err);
          toast.error("Failed to convert banner image to base64.");
          return;
        }
      }

      console.log("Enhanced Data Structure:", enhancedData);

      const backendPayload = {
        user_id: 1,
        description: JSON.stringify(enhancedData),
        banner: base64Banner,
        price: parseInt(form.price, 10) || 0,
        created_at: new Date().toISOString(),
        start_date: form.startDate || "",
        end_date: form.endDate || "",
        category: Array.isArray(form.categories) ? form.categories : [],
        winner_id: null,
        privacy: form.privacy || "public"
      };

      console.log("Backend Payload:", backendPayload);
      
      await fetcher({
        url: `$http://localhost:8080/{apiUrl}`, // http://localhost:8080/api/ideathons/add
        method: "POST",
        data: backendPayload,
        token: null,
        returned_status: 201,
      });
      
      localStorage.removeItem('editor-autosave');
      
      toast.success("Content published successfully!");
      router.push("/create/publish");
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPublishing(false);
    }
  }, [editorRef, title, subtitle, wordCount, form, router, setIsPublishing]);

  return { handlePublish };
}