import DesignCard from './DesignCard'

export default function DesignGrid({ designs, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {designs.map((design) => (
        <DesignCard key={design.id} design={design} onSelect={onSelect} />
      ))}
    </div>
  )
}
