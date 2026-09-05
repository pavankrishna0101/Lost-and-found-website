import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Tag } from 'lucide-react';
import { supabase, supabaseConfigured } from '../lib/supabase';
export default function ItemDetail() {
  const { productId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchItem() {
      if (!supabaseConfigured || !supabase) {
        setError(
          'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env.local.'
        );
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('lost and found')
        .select('product_id, product_name, user_phno, img_url')
        .eq('product_id', productId)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setItem(data);
      }
      setLoading(false);
    }

    fetchItem();
  }, [productId]);

  if (loading) {
    return (
      <main className="detail-state">
        <p>Loading details...</p>
      </main>
    );
  }

  if (error || !item) {
    return (
      <main className="detail-state">
        <h2>Item Not Found</h2>
        <p>
          {error ?? 'No matching product was located.'}
        </p>
        <Link
          to="/"
          className="detail-back detail-state-back"
        >
          <ArrowLeft size={17} /> Back to products
        </Link>
      </main>
    );
  }

  return (
    <main className="detail-page">
      <Link
        to="/"
        className="detail-back"
      >
        <ArrowLeft size={17} /> Back to products
      </Link>

      <div className="detail-card">
        <div className="detail-image-wrap">
          <img
            src={item.img_url}
            alt={item.product_name}
            className="detail-image"
            onError={(event) => {
              event.currentTarget.src =
                'https://via.placeholder.com/900x700?text=Image+Not+Available';
            }}
          />
        </div>

        <div className="detail-content">
          <div className="detail-topline">
            <span className="detail-label">
              <Tag size={15} />
              Product #{item.product_id}
            </span>
            <span className="detail-status">Reported item</span>
          </div>

          <h1 className="detail-title">{item.product_name}</h1>

          <div className="detail-contact">
            <div className="detail-contact-icon">
              <Phone size={18} />
            </div>
            <div>
              <p className="detail-contact-label">Contact number</p>
              <p className="detail-contact-number">{item.user_phno}</p>
            </div>
          </div>

          <div className="detail-divider" />

          <p className="detail-note">
            If this item belongs to you, use the contact number above to
            coordinate its return.
          </p>

          <a
            className="detail-contact-button"
            href={`tel:${item.user_phno}`}
          >
            <Phone size={17} />
            Contact owner
          </a>
        </div>
      </div>
    </main>
  );
}