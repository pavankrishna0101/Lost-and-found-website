import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, PackageSearch } from "lucide-react";
import { supabase, supabaseConfigured } from "../lib/supabase";

export default function Home() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchItems() {
      if (!supabaseConfigured || !supabase) {
        setError(
          "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env.local."
        );
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("lost and found")
        .select("*");

      if (error) {
        setError(`Unable to load items: ${error.message}`);
      } else {
        setItems(data ?? []);
      }

      setLoading(false);
    }

    fetchItems();
  }, []);

  // Loading screen
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">
          Loading items...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <p className="max-w-xl text-center text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="home-page">

      {/* Header */}
      <section className="home-heading">

        <div className="home-eyebrow">
          <PackageSearch size={16} />
          Community inventory
        </div>
        <h1 className="home-title">
          Lost & Found
        </h1>

        <p className="home-subtitle">
          Browse items that have been found.
        </p>

      </section>

      {/* Items */}
      <section className="home-items-section">

        {items.length === 0 ? (
          <div className="home-empty-state">
            <PackageSearch size={30} />
            <p>
              No items found.
            </p>
          </div>
        ) : (

          <>
            <div className="home-section-heading">
              <div>
                <p className="home-section-kicker">Recently reported</p>
                <h2>Available items</h2>
              </div>
              <span className="home-item-count">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="items-grid">

            {items.map((item) => (

              <button
                key={item.product_id}
                type="button"
                onClick={() => navigate(`/item/${item.product_id}`)}
                className="item-card"
              >

                {/* Image */}
                <div className="item-image">

                  <img
                    src={item.img_url}
                    alt={item.product_name}
                    className="item-image-content"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/600x400?text=Image+Not+Available";
                    }}
                  />

                </div>

                {/* Card Content */}
                <div className="item-card-content">

                  {/* Product name */}
                  <span className="item-card-id">
                    ID {item.product_id}
                  </span>
                  <h2 className="item-card-title">
                    {item.product_name}
                  </h2>

                  {/* Contact */}
                  <p className="item-card-contact">
                    Contact: {item.user_phno}
                  </p>

                  {/* View Details */}
                  <span className="item-card-action">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </span>

                </div>

              </button>

              ))}
            </div>
          </>

        )}

      </section>

    </main>
  );
}