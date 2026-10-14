import React, { useState, useEffect, useRef } from 'react';
import { KNOWLEDGE_GRAPH_DATA, GraphNode, GraphNodeType } from '../../data/knowledgeGraph';
import { Badge } from '../common/Badge';
import { ArrowRight, Filter, Search, RotateCcw, Share2, Compass, Radio, Rocket, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SimNode extends GraphNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const KnowledgeGraphCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(KNOWLEDGE_GRAPH_DATA.nodes[0]);
  const [activeTypeFilter, setActiveTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const nodesRef = useRef<SimNode[]>([]);
  const draggedNodeRef = useRef<SimNode | null>(null);

  // Initialize node positions in a circle layout
  useEffect(() => {
    const total = KNOWLEDGE_GRAPH_DATA.nodes.length;
    const radius = 240;
    nodesRef.current = KNOWLEDGE_GRAPH_DATA.nodes.map((node, i) => {
      const theta = (i / total) * 2 * Math.PI;
      return {
        ...node,
        x: 400 + Math.cos(theta) * radius + (Math.random() - 0.5) * 40,
        y: 300 + Math.sin(theta) * radius + (Math.random() - 0.5) * 40,
        vx: 0,
        vy: 0
      };
    });
  }, []);

  // Force-directed layout simulation & render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const tick = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 800);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 600);
      const centerX = width / 2;
      const centerY = height / 2;

      // Filter active nodes
      const visibleNodes = nodesRef.current.filter((n) => {
        const matchesType = activeTypeFilter === 'all' || n.type === activeTypeFilter;
        const matchesQuery = !searchQuery || n.label.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesQuery;
      });

      const visibleNodeIds = new Set(visibleNodes.map((n) => n.id));

      // Physics forces: Repulsion between all nodes
      for (let i = 0; i < visibleNodes.length; i++) {
        const n1 = visibleNodes[i];
        for (let j = i + 1; j < visibleNodes.length; j++) {
          const n2 = visibleNodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const distSq = dx * dx + dy * dy + 100;
          const dist = Math.sqrt(distSq);
          const force = 1800 / distSq;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;

          n1.vx -= fx;
          n1.vy -= fy;
          n2.vx += fx;
          n2.vy += fy;
        }
      }

      // Physics forces: Spring attraction along edges
      KNOWLEDGE_GRAPH_DATA.edges.forEach((edge) => {
        if (!visibleNodeIds.has(edge.source) || !visibleNodeIds.has(edge.target)) return;
        const n1 = visibleNodes.find((n) => n.id === edge.source);
        const n2 = visibleNodes.find((n) => n.id === edge.target);
        if (!n1 || !n2) return;

        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const targetDist = 130;
        const force = (dist - targetDist) * 0.04;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        n1.vx += fx;
        n1.vy += fy;
        n2.vx -= fx;
        n2.vy -= fy;
      });

      // Center gravitational pull & velocity damping
      visibleNodes.forEach((n) => {
        if (n === draggedNodeRef.current) return;
        const dx = centerX - n.x;
        const dy = centerY - n.y;
        n.vx += dx * 0.005;
        n.vy += dy * 0.005;

        n.vx *= 0.85;
        n.vy *= 0.85;

        n.x += n.vx;
        n.y += n.vy;

        // Keep inside bounds
        n.x = Math.max(30, Math.min(width - 30, n.x));
        n.y = Math.max(30, Math.min(height - 30, n.y));
      });

      // Clear dark background
      ctx.fillStyle = '#020205';
      ctx.fillRect(0, 0, width, height);

      // Draw faint cybernetic grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Edges (Relationship Lines)
      KNOWLEDGE_GRAPH_DATA.edges.forEach((edge) => {
        if (!visibleNodeIds.has(edge.source) || !visibleNodeIds.has(edge.target)) return;
        const n1 = visibleNodes.find((n) => n.id === edge.source);
        const n2 = visibleNodes.find((n) => n.id === edge.target);
        if (!n1 || !n2) return;

        const isHighlighted =
          selectedNode && (selectedNode.id === n1.id || selectedNode.id === n2.id);

        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.strokeStyle = isHighlighted ? 'rgba(0, 242, 255, 0.8)' : 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = isHighlighted ? 2 : 1;
        ctx.stroke();

        // Edge label if highlighted
        if (isHighlighted) {
          const midX = (n1.x + n2.x) / 2;
          const midY = (n1.y + n2.y) / 2;
          ctx.font = '10px JetBrains Mono, monospace';
          ctx.fillStyle = '#00f2ff';
          ctx.textAlign = 'center';
          ctx.fillText(edge.relationship, midX, midY - 4);
        }
      });

      // Draw Nodes
      visibleNodes.forEach((n) => {
        const isSelected = selectedNode?.id === n.id;
        const isConnected =
          selectedNode &&
          KNOWLEDGE_GRAPH_DATA.edges.some(
            (e) =>
              (e.source === selectedNode.id && e.target === n.id) ||
              (e.target === selectedNode.id && e.source === n.id)
          );

        // Node circle
        ctx.beginPath();
        const nodeRadius = isSelected ? 12 : isConnected ? 9 : 7;
        ctx.arc(n.x, n.y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = n.colorHex;

        if (isSelected) {
          ctx.shadowColor = '#00f2ff';
          ctx.shadowBlur = 18;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // Selection highlight ring
        if (isSelected) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 18, 0, Math.PI * 2);
          ctx.strokeStyle = '#00f2ff';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Node Label
        ctx.font = isSelected ? 'bold 11px Outfit, sans-serif' : '10px JetBrains Mono, monospace';
        ctx.fillStyle = isSelected ? '#ffffff' : isConnected ? '#00f2ff' : '#94a3af';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, n.x, n.y + (isSelected ? 24 : 18));
      });

      animId = requestAnimationFrame(tick);
    };

    tick();

    return () => cancelAnimationFrame(animId);
  }, [activeTypeFilter, searchQuery, selectedNode]);

  // Pointer interactions (drag & select)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clicked = nodesRef.current.find((n) => {
      const dist = Math.hypot(n.x - x, n.y - y);
      return dist < 22;
    });

    if (clicked) {
      setSelectedNode(clicked);
      draggedNodeRef.current = clicked;
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!draggedNodeRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    draggedNodeRef.current.x = e.clientX - rect.left;
    draggedNodeRef.current.y = e.clientY - rect.top;
    draggedNodeRef.current.vx = 0;
    draggedNodeRef.current.vy = 0;
  };

  const handlePointerUp = () => {
    draggedNodeRef.current = null;
  };

  // Find relationships for selected node
  const activeEdges = selectedNode
    ? KNOWLEDGE_GRAPH_DATA.edges.filter(
        (e) => e.source === selectedNode.id || e.target === selectedNode.id
      )
    : [];

  return (
    <div className="space-y-6">
      
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-space-900 border border-white/5 font-mono text-xs">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <Search className="w-4 h-4 text-holo-cyan" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search celestial node or mission..."
            className="w-full bg-space-950 px-3 py-1.5 rounded-lg border border-white/10 text-slate-200 outline-none focus:border-holo-cyan"
          />
        </div>

        {/* Type Filter Buttons */}
        <div className="flex flex-wrap gap-1.5">
          {['all', 'body', 'mission', 'rocket', 'concept'].map((type) => (
            <button
              key={type}
              onClick={() => setActiveTypeFilter(type)}
              className={`px-3 py-1 rounded-lg uppercase tracking-wider text-[11px] font-bold transition-all ${
                activeTypeFilter === type
                  ? 'bg-holo-cyan text-space-950 shadow-[0_0_12px_rgba(0,242,255,0.3)]'
                  : 'bg-space-950 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas and Detail Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Force-directed Canvas Viewport */}
        <div className="lg:col-span-8 h-[550px] sm:h-[650px] relative rounded-3xl overflow-hidden border border-white/10 bg-[#020205] shadow-2xl">
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="w-full h-full block cursor-grab active:cursor-grabbing"
          />

          <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-mono text-slate-400 bg-space-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/5">
            <span className="w-2 h-2 rounded-full bg-holo-cyan animate-pulse" />
            <span>Interactive Neural Space Graph • Drag Nodes to Reposition</span>
          </div>
        </div>

        {/* Selected Node Details Card */}
        <div className="lg:col-span-4 hud-card rounded-3xl p-6 sm:p-7 space-y-6">
          {selectedNode ? (
            <>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="cyan">{selectedNode.type.toUpperCase()}</Badge>
                  <span className="text-[11px] font-mono text-slate-500">{selectedNode.category}</span>
                </div>
                <h3 className="text-2xl font-black text-white font-outfit uppercase flex items-center gap-2.5">
                  <span
                    className="w-3.5 h-3.5 rounded-full inline-block flex-shrink-0"
                    style={{ backgroundColor: selectedNode.colorHex }}
                  />
                  {selectedNode.label}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-sans mt-2 leading-relaxed">
                  {selectedNode.summary}
                </p>
              </div>

              {/* Connected Relationships */}
              <div>
                <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-holo-cyan mb-3 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5" />
                  Active Connected Relationships ({activeEdges.length})
                </h4>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1 font-mono text-xs">
                  {activeEdges.map((edge) => {
                    const isOutgoing = edge.source === selectedNode.id;
                    const otherNodeId = isOutgoing ? edge.target : edge.source;
                    const otherNode = KNOWLEDGE_GRAPH_DATA.nodes.find((n) => n.id === otherNodeId);
                    if (!otherNode) return null;

                    return (
                      <div
                        key={edge.id}
                        onClick={() => setSelectedNode(otherNode)}
                        className="p-2.5 rounded-xl bg-space-950 border border-white/5 hover:border-holo-cyan/50 cursor-pointer transition-colors"
                      >
                        <span className="text-[10px] text-holo-cyan block uppercase">
                          {edge.relationship}
                        </span>
                        <span className="text-slate-200 font-bold mt-0.5 block">
                          {otherNode.label} ({otherNode.type})
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation CTA */}
              {selectedNode.route && (
                <div className="pt-2">
                  <Link
                    to={selectedNode.route}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-holo-cyan hover:bg-[#33f5ff] text-space-950 font-bold font-mono text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,242,255,0.3)]"
                  >
                    <span>Inspect In Platform Module</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="py-16 text-center font-mono text-xs text-slate-500">
              Click any node in the knowledge graph to inspect its connected universe relationships.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
